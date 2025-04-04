import type { ExecutionEnviornment } from "@/lib/types";
import type { ExtractDataWithAiTask } from "../task/ExtractDataWithAi";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/credential";
import OpenAi from "openai";

export async function ExtractDataWithAiExecutor(
	enviornment: ExecutionEnviornment<typeof ExtractDataWithAiTask>,
): Promise<boolean> {
	try {
		const credentialId = enviornment.getInput("Credentials");
		if (!credentialId) {
			enviornment.log.error("input -> credentials is not defined");
			return false;
		}
		const content = enviornment.getInput("Content");
		if (!content) {
			enviornment.log.error("input -> content is not defined");
			return false;
		}
		const prompt = enviornment.getInput("Prompt");
		if (!prompt) {
			enviornment.log.error("input -> prompt is not defined");
			return false;
		}

		const credential = await prisma.credential.findUnique({
			where: {
				id: credentialId,
			},
		});

		if (!credential) {
			enviornment.log.error("Credential no found");
			return false;
		}

		const plainCredentialValue = symmetricDecrypt(credential.value);

		if (!plainCredentialValue) {
			enviornment.log.error("Cannot decrypt credential");
			return false;
		}

		const openAi = new OpenAi({
			apiKey: plainCredentialValue,
		});

		const response = await openAi.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{
					role: "system",
					content:
						"You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
				},
				{
					role: "user",
					content: content,
				},
				{
					role: "user",
					content: prompt,
				},
			],
			temperature: 1,
		});

		enviornment.log.info(
			`Prompt tokens used: ${JSON.stringify(response.usage?.prompt_tokens)}`,
		);

		enviornment.log.info(
			`Completition tokens used: ${JSON.stringify(
				response.usage?.completion_tokens,
			)}`,
		);

		const result = response.choices[0].message?.content;

		if (!result) {
			enviornment.log.error("Empty response from AI");
			return false;
		}

		enviornment.setOutput("Extracted Data", JSON.stringify(result));

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
