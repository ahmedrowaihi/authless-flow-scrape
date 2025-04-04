"use server";

import prisma from "@/lib/prisma";
import { type AppNode, TaskType, WorkflowStatus } from "@/lib/types";
import { createFlowNode } from "@/lib/workflow/CreateFlowNode";
import { flowToExecutionPlan } from "@/lib/workflow/executionPlan";
import {
	createWorkflowShema,
	type createWorkflowShemaType,
	type duplicateWorkflowSchemaType,
} from "@/schema/workflows";
import type { Edge } from "@xyflow/react";
import parser from "cron-parser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getWorkflowsForUser() {
	return prisma.workflow.findMany({
		orderBy: { createdAt: "asc" },
	});
}

export async function createWorkflow(form: createWorkflowShemaType) {
	const { success, data } = createWorkflowShema.safeParse(form);

	if (!success) {
		throw new Error("Invalid form data");
	}

	const initWorkflow: { nodes: AppNode[]; edges: Edge[] } = {
		nodes: [],
		edges: [],
	};
	initWorkflow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));
	const result = await prisma.workflow.create({
		data: {
			status: WorkflowStatus.DRAFT,
			definition: JSON.stringify(initWorkflow),
			...data,
		},
	});
	if (!result) {
		throw new Error("Failed to create workflow");
	}

	redirect(`/workflow/editor/${result.id}`);
}

export async function deleteWorkflow(workflowId: string) {
	await prisma.workflow.delete({
		where: {
			id: workflowId,
		},
	});

	revalidatePath("/workflows");
}

export async function updateWorkFlow({
	id,
	definition,
}: {
	id: string;
	definition: string;
}) {
	const workflow = await prisma.workflow.findUnique({
		where: {
			id,
		},
	});

	if (!workflow) {
		throw new Error("Workflow not found");
	}

	if (workflow.status !== WorkflowStatus.DRAFT) {
		throw new Error("Workflow is not draft");
	}

	await prisma.workflow.update({
		data: {
			definition,
		},
		where: {
			id,
		},
	});
	revalidatePath("/workflows");
}

export async function getWorkflowExecutionWithPhases(executionId: string) {
	return prisma.workflowExecution.findUnique({
		where: { id: executionId },
		include: {
			phases: {
				orderBy: {
					number: "asc",
				},
			},
		},
	});
}

export async function getWorkflowPhaseDetails(phaseId: string) {
	return prisma.executionPhase.findUnique({
		where: {
			id: phaseId,
		},
		include: {
			logs: {
				orderBy: {
					timestamp: "asc",
				},
			},
		},
	});
}

export async function getWorkflowExecutions(workflowId: string) {
	return await prisma.workflowExecution.findMany({
		where: {
			workflowId,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
}

export async function publishWorkflow({
	id,
	flowDefinition,
}: {
	id: string;
	flowDefinition: string;
}) {
	const workflow = await prisma.workflow.findUnique({
		where: {
			id,
		},
	});
	if (!workflow) {
		throw new Error("Workflow not found");
	}

	if (workflow.status !== WorkflowStatus.DRAFT) {
		throw new Error("Workflow is not draft");
	}

	const flow = JSON.parse(flowDefinition);

	const result = flowToExecutionPlan(flow.nodes, flow.edges);

	if (result.error) {
		throw new Error("Flow definition not valid");
	}

	if (!result.executionPlan) {
		throw new Error("Something went wrong, No eexecution plan generated");
	}

	await prisma.workflow.update({
		where: {
			id,
		},
		data: {
			definition: flowDefinition,
			executionPlan: JSON.stringify(result.executionPlan),
			status: WorkflowStatus.PUBLISHED,
		},
	});
	revalidatePath(`/worflow/editor/${id}`);
}

export async function unPublishWorkflow(id: string) {
	const workflow = await prisma.workflow.findUnique({
		where: {
			id,
		},
	});
	if (!workflow) {
		throw new Error("Workflow not found");
	}

	if (workflow.status !== WorkflowStatus.PUBLISHED) {
		throw new Error("Workflow is not published");
	}

	await prisma.workflow.update({
		where: {
			id,
		},
		data: {
			status: WorkflowStatus.DRAFT,
			executionPlan: null,
		},
	});
	revalidatePath(`/worflow/editor/${id}`);
}

export async function updateWorkFlowCron({
	id,
	cron,
}: {
	id: string;
	cron: string;
}) {
	try {
		const interval = parser.parseExpression(cron, { utc: true });
		await prisma.workflow.update({
			where: {
				id,
			},
			data: {
				cron,
				nextRunAt: interval.next().toDate(),
			},
		});
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
		}
		throw new Error("Invalid cron expression");
	}
	revalidatePath("/workflows");
}

export async function removeWorkflowSchedule(id: string) {
	await prisma.workflow.update({
		where: {
			id,
		},
		data: {
			cron: null,
			nextRunAt: null,
		},
	});
	revalidatePath("/workflows");
}

export async function duplicateWorkflow(form: duplicateWorkflowSchemaType) {
	const { success, data } = createWorkflowShema.safeParse(form);
	if (!success) {
		throw new Error("Invalid form data");
	}

	const sourceWorkflow = await prisma.workflow.findUnique({
		where: {
			id: form.workflowId,
		},
	});

	if (!sourceWorkflow) {
		throw new Error("Workflow not found");
	}

	const result = await prisma.workflow.create({
		data: {
			status: WorkflowStatus.DRAFT,
			name: data.name,
			description: data.description,
			definition: sourceWorkflow.definition,
		},
	});
	if (!result) {
		throw new Error("Failed to duplicate workflow");
	}

	redirect("/workflows");
}
