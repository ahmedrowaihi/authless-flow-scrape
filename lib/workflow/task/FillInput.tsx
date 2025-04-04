import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { type LucideProps, Edit3Icon } from "lucide-react";

export const FillInputTask = {
	type: TaskType.FILL_INPUT,
	label: "Fill Input",
	icon: (props: LucideProps) => (
		<Edit3Icon className="stroke-orange-400" {...props} />
	),
	isEntryPoint: false,
	inputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
			required: true,
		},
		{
			name: "Selector",
			type: TaskParamType.STRING,
			required: true,
		},
		{
			name: "Value",
			type: TaskParamType.STRING,
			required: true,
		},
	] as const,
	outputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
