import type { ExecutionEnviornment } from "@/lib/types";
import type { DeliverViaWebHookTask } from "../task/DeliverViaWebHook";

export async function DeviverViaWebHookExecutor(
	enviornment: ExecutionEnviornment<typeof DeliverViaWebHookTask>,
): Promise<boolean> {
	try {
		const targetUrl = enviornment.getInput("Target url");
		if (!targetUrl) {
			enviornment.log.error("input -> targetUrl is not defined");
			return false;
		}
		const body = enviornment.getInput("Body");
		if (!body) {
			enviornment.log.error("input -> Body is not defined");
			return false;
		}

		const res = await fetch(targetUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		const resStatus = res.status;

		if (resStatus !== 200) {
			enviornment.log.error(`Status Code ${resStatus}`);
			return false;
		}

		const resBody = await res.json();
		enviornment.log.info(JSON.stringify(resBody, null, 4));

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
