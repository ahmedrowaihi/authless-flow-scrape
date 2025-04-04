import { getAppUrl } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { WorkflowStatus } from "@/lib/types";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
	const now = new Date();

	const workflows = await prisma.workflow.findMany({
		select: {
			id: true,
		},
		where: {
			status: WorkflowStatus.PUBLISHED,
			cron: { not: null },
			nextRunAt: {
				lte: now,
			},
		},
	});
	for (const workflow of workflows) {
		triggerWorkflow(workflow.id);
	}
	return Response.json({ workflowsToRun: workflows.length }, { status: 200 });
}

function triggerWorkflow(wofkflowId: string) {
	const triggerApiUrl = getAppUrl(
		`api/workflows/execute?workflowId=${wofkflowId}`,
	);
	fetch(triggerApiUrl, {
		headers: {
			Authorization: `Bearer ${process.env.API_SECRET}`,
		},
		cache: "no-store",
	}).catch((error: Error) => {
		console.error(
			"Error triggering workflow with id",
			wofkflowId,
			":error->",
			error.message,
		);
	});
}
