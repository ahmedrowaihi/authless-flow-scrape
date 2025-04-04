import type { ExecutionEnviornment } from "@/lib/types";
import type { FillInputTask } from "../task/FillInput";

export async function FillInputExecutor(
	enviornment: ExecutionEnviornment<typeof FillInputTask>,
): Promise<boolean> {
	try {
		const selector = enviornment.getInput("Selector");
		if (!selector) {
			enviornment.log.error("input -> selector is not defined");
			return false;
		}

		const value = enviornment.getInput("Value");
		if (!value) {
			enviornment.log.error("input -> value is not defined");
			return false;
		}

		await enviornment.getPage()?.type(selector, value);

		return true;
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(error.message);
			enviornment.log.error(error.message);
		} else {
			enviornment.log.error("Unknown error");
		}
		return false;
	}
}
