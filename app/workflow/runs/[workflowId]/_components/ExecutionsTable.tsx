"use client";
import { getWorkflowExecutions } from "@/actions/workflows";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { datesToDurationString } from "@/lib/helper";
import type { WorkflowExecutionStatus } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import ExecutionStatusIndicator from "./ExecutionStatusIndicator";

type InitialData = Awaited<ReturnType<typeof getWorkflowExecutions>>;

function ExecutionsTable({
	workflowId,
	initialData,
}: {
	workflowId: string;
	initialData: InitialData;
}) {
	const query = useQuery({
		queryKey: ["executions", workflowId],
		initialData,
		queryFn: () => getWorkflowExecutions(workflowId),
		refetchInterval: 5000,
	});

	const router = useRouter();

	return (
		<div className="border rounded-lg shadow-md overflow-auto ">
			<Table className="h-full">
				<TableHeader className="bg-muted">
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right text-sm text-muted-foreground">
							Started at
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="gap-2 h-full overflow-auto">
					{query.data.map((execution) => {
						const duration = datesToDurationString(
							execution.completedAt,
							execution.startedAt,
						);

						const formattedStartedAt =
							execution.startedAt &&
							formatDistanceToNow(execution.startedAt, { addSuffix: true });

						return (
							<TableRow
								key={execution.id}
								className="cursor-pointer"
								onClick={() => {
									router.push(
										`/workflow/runs/${execution.workflowId}/${execution.id}`,
									);
								}}
							>
								<TableCell>
									<div className="flex flex-col">
										<span className="font-semibold">{execution.id}</span>
										<div className="text-muted-foreground text-xs flex gap-1 items-center">
											<span className="">Triggered via</span>
											<Badge variant={"outline"}>{execution.trigger}</Badge>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex flex-col">
										<div className="flex gap-2 items-center">
											<ExecutionStatusIndicator
												status={execution.status as WorkflowExecutionStatus}
											/>
											<span className="font-semibold capitalize">
												{execution.status}
											</span>
										</div>
										<div className="text-muted-foreground text-xs mx-5">
											{duration}
										</div>
									</div>
								</TableCell>
								<TableCell className="text-right text-muted-foreground capitalize first:uppercase">
									{formattedStartedAt}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}

export default ExecutionsTable;
