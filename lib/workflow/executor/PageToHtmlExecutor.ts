import type { ExecutionEnviornment } from "@/lib/types";
import type { PageToHtmlTask } from "../task/PageToHtml";

export async function PageToHtmlExecutor(
	enviornment: ExecutionEnviornment<typeof PageToHtmlTask>,
): Promise<boolean> {
	try {
		const html = await enviornment.getPage()?.content();
		if (!html) {
			throw new Error("No HTML content found");
		}
		enviornment.setOutput("HTML", html);
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
