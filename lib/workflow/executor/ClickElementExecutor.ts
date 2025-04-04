import type { ExecutionEnviornment } from "@/lib/types";
import type { ClickElementTask } from "../task/ClickElement";

export async function ClickElementExecutor(
	enviornment: ExecutionEnviornment<typeof ClickElementTask>,
): Promise<boolean> {
	try {
		const selector = enviornment.getInput("Selector");
		if (!selector) {
			enviornment.log.error("input -> selector is not defined");
			return false;
		}

		await enviornment.getPage()?.click(selector);

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
