import type { ExecutionEnviornment } from "@/lib/types";
import type { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
	enviornment: ExecutionEnviornment<typeof AddPropertyToJsonTask>,
): Promise<boolean> {
	try {
		const jsonData = enviornment.getInput("JSON");
		if (!jsonData) {
			enviornment.log.error("input -> JSON is not defined");
			return false;
		}
		const propertyName = enviornment.getInput("Property name");

		if (!propertyName) {
			enviornment.log.error("input -> Property Name is not defined");
			return false;
		}

		const propertyValue = enviornment.getInput("Property value");

		if (!propertyValue) {
			enviornment.log.error("input -> Propety Value is not defined");
			return false;
		}

		const json = JSON.parse(jsonData);
		json[propertyName] = propertyValue;

		enviornment.setOutput("Updated JSON", JSON.stringify(json));

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
