import {
	type Log,
	type LogCollector,
	type LogFunction,
	type LogLevel,
	LogLevels,
} from "./types";

export function createLogCollector(): LogCollector {
	const logs: Log[] = [];

	const getAll = () => logs;

	const logFunctions = {} as Record<LogLevel, LogFunction>;

	for (const level of LogLevels) {
		logFunctions[level] = (message: string) => {
			logs.push({ level, message, timeStamp: new Date() });
		};
	}

	return {
		getAll,
		...logFunctions,
	};
}
