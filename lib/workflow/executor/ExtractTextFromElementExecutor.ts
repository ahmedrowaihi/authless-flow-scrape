import type { ExecutionEnviornment } from "@/lib/types";
import * as cheerio from "cheerio";
import type { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";

export async function ExtractTextFromElement(
	enviornment: ExecutionEnviornment<typeof ExtractTextFromElementTask>,
): Promise<boolean> {
	try {
		const selector = enviornment.getInput("Selector");
		if (!selector) {
			enviornment.log.error("Selector not defined");
			return false;
		}

		const html = enviornment.getInput("Html");
		if (!html) {
			enviornment.log.error("HTML not defined");
			return false;
		}

		const $ = cheerio.load(html);
		const element = $(selector);

		if (!element) {
			enviornment.log.error("Element not found on selector");
			return false;
		}

		const extractedText = $.text(element);
		if (!extractedText) {
			enviornment.log.error("Element has no text");
			return false;
		}

		enviornment.setOutput("Extracted Text", extractedText);

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
