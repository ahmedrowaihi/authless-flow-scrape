"use server";

import prisma from "@/lib/prisma";
import {
	ExecutionPhaseStatus,
	type WorkflowExecutionPlan,
	WorkflowExecutionStatus,
	WorkflowExecutionTrigger,
	WorkflowStatus,
} from "@/lib/types";
import { executeWorkflow } from "@/lib/workflow/executeWorkflow";
import { flowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { redirect } from "next/navigation";

export async function runWorkflow(form: {
	workflowId: string;
	flowDefinition?: string;
}) {
	const { workflowId, flowDefinition } = form;
	if (!workflowId) {
		throw new Error("workflowId is required");
	}

	const workflow = await prisma.workflow.findUnique({
		where: {
			id: workflowId,
		},
	});

	if (!workflow) {
		throw new Error("Workflow not found");
	}

	let executionPlan: WorkflowExecutionPlan;
	let workflowDefinition = flowDefinition;

	// Is the execution plan is published then the execution plan will set from workflow definition
	if (workflow.status === WorkflowStatus.PUBLISHED) {
		if (!workflow.executionPlan) {
			throw new Error("No execution planned found in published workflow");
		}
		executionPlan = JSON.parse(workflow.executionPlan);
		workflowDefinition = workflow.definition;
	} else {
		// Otherwise generating execution plan from flow-definition passed
		if (!flowDefinition) {
			throw new Error("Flow definition is not defined");
		}

		const flow = JSON.parse(flowDefinition);
		const result = flowToExecutionPlan(flow.nodes, flow.edges);
		if (result.error) {
			throw new Error("Flow definition not valid");
		}
		if (!result.executionPlan) {
			throw new Error("No execution plan generated, Something went wrong");
		}
		executionPlan = result.executionPlan;
	}

	const execution = await prisma.workflowExecution.create({
		data: {
			workflowId,
			status: WorkflowExecutionStatus.PENDING,
			startedAt: new Date(),
			trigger: WorkflowExecutionTrigger.MANUAl,
			definition: workflowDefinition,
			phases: {
				create: executionPlan.flatMap((phase) =>
					phase.nodes.flatMap((node) => {
						return {
							status: ExecutionPhaseStatus.CREATED,
							number: phase.phase,
							node: JSON.stringify(node),
							name: TaskRegistry[node.data.type].label,
						};
					}),
				),
			},
		},
		select: {
			id: true,
			phases: true,
		},
	});

	if (!execution) {
		throw new Error("Workflow execution not created");
	}

	// This will be a long running function, so just calling it and making it run in background
	executeWorkflow(execution.id);

	redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
