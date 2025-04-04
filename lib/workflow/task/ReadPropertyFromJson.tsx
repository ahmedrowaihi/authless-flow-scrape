import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { FileJson2Icon, type LucideProps } from "lucide-react";

export const ReadPropertyFromJsonTask = {
	type: TaskType.READ_PROPERTY_FROM_JSON,
	label: "Read property from JSON",
	icon: (props: LucideProps) => (
		<FileJson2Icon className="stroke-orange-400" {...props} />
	),
	isEntryPoint: false,
	inputs: [
		{
			name: "JSON",
			type: TaskParamType.STRING,
			required: true,
			variant: "textarea",
		},
		{
			name: "Property name",
			type: TaskParamType.STRING,
			required: true,
		},
	] as const,
	outputs: [
		{
			name: "Property Value",
			type: TaskParamType.STRING,
		},
	] as const,
} satisfies WorkflowTask;
