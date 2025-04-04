import type { ExecutionEnviornment } from "@/lib/types";
import puppeteer from "puppeteer";
import type { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
	enviornment: ExecutionEnviornment<typeof LaunchBrowserTask>,
): Promise<boolean> {
	try {
		const websiteUrl = enviornment.getInput("Website Url");
		console.log(websiteUrl);

		const browser = await puppeteer.launch({
			headless: true, // For dev_testing
			args: ["--no-sandbox"],
		});
		enviornment.log.info("Browser started successfully");
		enviornment.setBrowser(browser);
		const page = await browser.newPage();
		await page.goto(websiteUrl);
		enviornment.setPage(page);
		enviornment.log.info(`Opened page at: ${websiteUrl}`);
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
