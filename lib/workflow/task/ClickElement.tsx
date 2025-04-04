import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { type LucideProps, MousePointerClick } from "lucide-react";

export const ClickElementTask = {
	type: TaskType.CLICK_ELEMENT,
	label: "Click Element",
	icon: (props: LucideProps) => (
		<MousePointerClick className="stroke-orange-400" {...props} />
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
