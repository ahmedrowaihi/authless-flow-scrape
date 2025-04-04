"use server";

import { periodToDateRange } from "@/lib/helper";
import prisma from "@/lib/prisma";
import {
	ExecutionPhaseStatus,
	type Period,
	WorkflowExecutionStatus,
	type WorkflowExecutionType,
} from "@/lib/types";
import { eachDayOfInterval, format } from "date-fns";

export async function getPeriods() {
	const years = await prisma.workflowExecution.aggregate({
		where: {},
		_min: {
			startedAt: true,
		},
	});

	const currentYear = new Date().getFullYear();

	const minYear = years._min.startedAt
		? years._min.startedAt.getFullYear()
		: currentYear;

	const periods: Period[] = [];

	for (let year = minYear; year <= currentYear; year++) {
		for (let month = 0; month <= 11; month++) {
			periods.push({ year, month });
		}
	}
	return periods;
}

export async function getStatsCardsValue(period: Period) {
	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
			status: {
				in: [WorkflowExecutionStatus.COMPLETED, WorkflowExecutionStatus.FAILED],
			},
		},
		select: {
			phases: {
				where: {},
				select: {
					id: true,
				},
			},
		},
	});

	const stats = {
		WorkflowExecutions: executions.length,
		phaseExecutions: 0,
	};

	stats.phaseExecutions = executions.reduce(
		(sum, execution) => sum + execution.phases.length,
		0,
	);

	return stats;
}

export async function getWorkflowExecutionsStats(period: Period) {
	const dateRange = periodToDateRange(period);

	const executions = await prisma.workflowExecution.findMany({
		where: {
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
			status: {
				in: [ExecutionPhaseStatus.COMPLETED, ExecutionPhaseStatus.FAILED],
			},
		},
	});

	const stats: WorkflowExecutionType = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((date) => format(date, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = {
				success: 0,
				failed: 0,
			};
			return acc;
		}, {} as WorkflowExecutionType);

	for (const execution of executions) {
		const date = format(execution.startedAt as Date, "yyyy-MM-dd");

		if (execution.status === WorkflowExecutionStatus.COMPLETED) {
			stats[date].success += 1;
		}

		if (execution.status === WorkflowExecutionStatus.FAILED) {
			stats[date].failed += 1;
		}
	}

	const result = Object.entries(stats).map(([date, infos]) => ({
		date,
		...infos,
	}));

	return result;
}
export async function getCreditsUsageInPeriod(period: Period) {
	const dateRange = periodToDateRange(period);

	const executionsPhases = await prisma.workflowExecution.findMany({
		where: {
			startedAt: {
				gte: dateRange.startDate,
				lte: dateRange.endDate,
			},
		},
	});

	const stats: WorkflowExecutionType = eachDayOfInterval({
		start: dateRange.startDate,
		end: dateRange.endDate,
	})
		.map((date) => format(date, "yyyy-MM-dd"))
		.reduce((acc, date) => {
			acc[date] = {
				success: 0,
				failed: 0,
			};
			return acc;
		}, {} as WorkflowExecutionType);

	for (const phase of executionsPhases) {
		const date = format(phase.startedAt as Date, "yyyy-MM-dd");

		if (phase.status === ExecutionPhaseStatus.COMPLETED) {
			stats[date].success += 0;
		}

		if (phase.status === ExecutionPhaseStatus.FAILED) {
			stats[date].failed += 0;
		}
	}

	const result = Object.entries(stats).map(([date, infos]) => ({
		date,
		...infos,
	}));

	return result;
}
