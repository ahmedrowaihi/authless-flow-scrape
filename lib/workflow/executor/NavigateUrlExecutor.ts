import type { ExecutionEnviornment } from "@/lib/types";
import type { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
	enviornment: ExecutionEnviornment<typeof NavigateUrlTask>,
): Promise<boolean> {
	try {
		const url = enviornment.getInput("Url");
		if (!url) {
			enviornment.log.error("input -> Url is not defined");
			return false;
		}

		await enviornment.getPage()?.goto(url);
		enviornment.log.info(`Visited ${url}`);

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
