"use client";

import ExecutionStatusIndicator, {
	ExecutionStatusLabel,
} from "@/app/workflow/runs/[workflowId]/_components/ExecutionStatusIndicator";
import TooltipWrapper from "@/components/TooltipWrapper";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type WorkflowExecutionStatus, WorkflowStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Workflow } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import {
	ChevronRightIcon,
	ClockIcon,
	CornerDownRightIcon,
	FileTextIcon,
	MoveRightIcon,
	PlayIcon,
	ShuffleIcon,
} from "lucide-react";
import Link from "next/link";
import DuplicateWorkflowDialog from "./DuplicateWorkflowDialog";
import RunButton from "./RunButton";
import SchedulerDialog from "./SchedulerDialog";
import WorkflowActions from "./WorkflowActions";

const statusColor = {
	[WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-600",
	[WorkflowStatus.PUBLISHED]: "bg-primary",
};

function WorkflowCard({ workflow }: { workflow: Workflow }) {
	const isDraft = workflow.status === WorkflowStatus.DRAFT;
	return (
		<Card className="border border-separate shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30 group/card">
			<CardContent className="p-4 flex items-center justify-between h-[100px]">
				<div className="flex items-center justify-end space-x-3">
					<div
						className={cn(
							"w-10 h-10 rounded-full flex items-center justify-center",
							statusColor[workflow.status as WorkflowStatus],
						)}
					>
						{isDraft ? (
							<FileTextIcon className="h-5 w-5 stroke-white" />
						) : (
							<PlayIcon className="h-5 w-5 stroke-white" />
						)}
					</div>
					<div>
						<h3 className="text-base font-bold text-muted-foreground flex items-center">
							<TooltipWrapper content={workflow.description || ""}>
								<Link href={`/workflow/editor/${workflow.id}`}>
									{workflow.name}
								</Link>
							</TooltipWrapper>
							{isDraft && (
								<span className="ml-2 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
									Draft
								</span>
							)}
							<DuplicateWorkflowDialog
								workflowId={workflow.id}
								name={workflow.name}
								description={workflow.description || ""}
							/>
						</h3>
						<SchedulerSection
							isDraft={isDraft}
							workflowId={workflow.id}
							workflowCron={workflow.cron}
						/>
					</div>
				</div>
				<div className="flex items-center space-x-2">
					{!isDraft && <RunButton workflowId={workflow.id} />}
					<Link
						href={`/workflow/editor/${workflow.id}`}
						className={cn(
							buttonVariants({ variant: "outline", size: "sm" }),
							"flex items-center p-4",
						)}
					>
						<ShuffleIcon size={16} />
						Edit
					</Link>
					<WorkflowActions
						workflowName={workflow.name}
						workflowId={workflow.id}
					/>
				</div>
			</CardContent>
			<LastRunDetails workflow={workflow} />
		</Card>
	);
}

export default WorkflowCard;

function SchedulerSection({
	isDraft,
	workflowId,
	workflowCron,
}: {
	isDraft: boolean;
	workflowId: string;
	workflowCron: string | null;
}) {
	if (isDraft) return null;
	return (
		<div className="flex items-center gap-2">
			<CornerDownRightIcon className="h-4 w-4 text-muted-foreground" />
			<SchedulerDialog
				workflowId={workflowId}
				workflowCron={workflowCron}
				// forcing rerender of dialog using key
				key={`${workflowCron}-${workflowId}`}
			/>
			<MoveRightIcon className="h-4 w-4 text-muted-foreground" />
		</div>
	);
}

function LastRunDetails({ workflow }: { workflow: Workflow }) {
	const isDraft = workflow.status === WorkflowStatus.DRAFT;

	if (isDraft) return null;

	const { lastRunAt, lastRunStatus, lastRunId, nextRunAt } = workflow;
	const formattedStartedAt =
		lastRunAt && formatDistanceToNow(lastRunAt, { addSuffix: true });

	const nextSchedule = nextRunAt && format(nextRunAt, "yyyy-MM-dd HH:mm");
	const nextScheduleUtc =
		nextRunAt && formatInTimeZone(nextRunAt, "UTC", "HH:mm");

	return (
		<div className="bg-primary/5 px-4 py-1 flex justify-between items-center text-muted-foreground">
			<div className="flex items-center text-sm gap-2">
				{lastRunAt && (
					<Link
						href={`/workflow/runs/${workflow.id}/${lastRunId}`}
						className="flex items-center text-sm gap-2 group"
					>
						<span>Last run:</span>
						<ExecutionStatusIndicator
							status={lastRunStatus as WorkflowExecutionStatus}
						/>
						<ExecutionStatusLabel
							status={lastRunStatus as WorkflowExecutionStatus}
						/>
						<span>{formattedStartedAt}</span>
						<ChevronRightIcon
							size={14}
							className="-translate-x-[2px] group-hover:translate-x-0 transition"
						/>
					</Link>
				)}
				{!lastRunAt && <p>No runs yet</p>}
				{nextRunAt && (
					<div className="flex items-center text-sm gap-2">
						<ClockIcon size={12} />
						<span>Next run at:</span>
						<span>{nextSchedule}</span>
						<span className="text-sm">({nextScheduleUtc} UTC)</span>
					</div>
				)}
			</div>
		</div>
	);
}
