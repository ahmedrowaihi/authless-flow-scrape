import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { type LucideProps, MouseIcon } from "lucide-react";

export const ScrollToElementTask = {
	type: TaskType.SCROLL_TO_ELEMENT,
	label: "Scroll to element",
	icon: (props: LucideProps) => (
		<MouseIcon className="stroke-orange-400" {...props} />
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
	] as const,
	outputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
