import type { ExecutionEnviornment } from "@/lib/types";
import type { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(
	enviornment: ExecutionEnviornment<typeof ReadPropertyFromJsonTask>,
): Promise<boolean> {
	try {
		const jsonData = enviornment.getInput("JSON");
		if (!jsonData) {
			enviornment.log.error("input -> JSON is not defined");
			return false;
		}
		const propertyName = enviornment.getInput("Property name");

		if (!propertyName) {
			enviornment.log.error("input -> Property is not defined");
			return false;
		}
		const json = JSON.parse(jsonData);

		const propertValue = json[propertyName];

		if (!propertValue) {
			enviornment.log.error("Property not found");
			return false;
		}

		enviornment.setOutput("Property Value", propertValue);

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
