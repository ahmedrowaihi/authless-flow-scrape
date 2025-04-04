import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { BrainIcon, type LucideProps } from "lucide-react";

export const ExtractDataWithAiTask = {
	type: TaskType.EXTRACT_DATA_WITH_AI,
	label: "Extract data with AI",
	icon: (props: LucideProps) => (
		<BrainIcon className="stroke-rose-400" {...props} />
	),
	isEntryPoint: false,
	inputs: [
		{
			name: "Content",
			type: TaskParamType.STRING,
			required: true,
		},
		{
			name: "Credentials",
			type: TaskParamType.CREDENTIAL,
			required: true,
		},
		{
			name: "Prompt",
			type: TaskParamType.STRING,
			required: true,
			variant: "textarea",
		},
	] as const,
	outputs: [
		{
			name: "Extracted Data",
			type: TaskParamType.STRING,
		},
	] as const,
} satisfies WorkflowTask;
