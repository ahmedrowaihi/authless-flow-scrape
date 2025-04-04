import {
	getPeriods,
	getStatsCardsValue,
	getWorkflowExecutionsStats,
} from "@/actions/analytics";
import { Skeleton } from "@/components/ui/skeleton";
import type { Period } from "@/lib/types";
import { CirclePlayIcon, WaypointsIcon } from "lucide-react";
import { Suspense } from "react";
import ExecutionStatusChart from "./_components/ExecutionStatusChart";
import PeriodSelector from "./_components/PeriodSelector";
import StatsCard from "./_components/StatsCard";

function Homepage({
	searchParams,
}: {
	searchParams: { month?: string; year?: string };
}) {
	const currDate = new Date();
	const { month, year } = searchParams;

	const period: Period = {
		month: month ? Number.parseInt(month) : currDate.getMonth(),
		year: year ? Number.parseInt(year) : currDate.getFullYear(),
	};

	return (
		<div className="flex flex-1 flex-col h-full">
			<div className="flex justify-between">
				<h1 className="text-3xl text-bold">Home</h1>
				<Suspense fallback={<Skeleton className="w-[180px] h-[40px]" />}>
					<PeriodSelectorWrapper selectedPeriod={period} />
				</Suspense>
			</div>
			<div className="h-full py-6 flex flex-col gap-5">
				<Suspense fallback={<StatsCardSkeleton />}>
					<StatsCards selectedPeriod={period} />
				</Suspense>{" "}
				<Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
					<StatsExecutionStatus period={period} />
				</Suspense>
			</div>
		</div>
	);
}

export default Homepage;

async function PeriodSelectorWrapper({
	selectedPeriod,
}: {
	selectedPeriod: Period;
}) {
	const periods = await getPeriods();

	return <PeriodSelector periods={periods} selectedPeriod={selectedPeriod} />;
}
async function StatsCards({ selectedPeriod }: { selectedPeriod: Period }) {
	const data = await getStatsCardsValue(selectedPeriod);

	return (
		<div className="grid gap-3 lg:gap-8 lg:grid-cols-3 min-h-[120px]">
			<StatsCard
				title="Workflow Executions"
				value={data.WorkflowExecutions}
				icon={CirclePlayIcon}
			/>
			<StatsCard
				title="Phase Executions"
				value={data.phaseExecutions}
				icon={WaypointsIcon}
			/>
		</div>
	);
}

async function StatsExecutionStatus({ period }: { period: Period }) {
	const data = await getWorkflowExecutionsStats(period);

	return <ExecutionStatusChart data={data} />;
}

function StatsCardSkeleton() {
	return (
		<div className="grid gap-3 lg:gap-8 lg:grid-cols-3">
			{[1, 2, 3].map((i) => (
				<Skeleton key={i} className="w-full min-h-[120px]" />
			))}
		</div>
	);
}
