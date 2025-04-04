import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { type LucideProps, Link2Icon } from "lucide-react";

export const NavigateUrlTask = {
	type: TaskType.NAVIGATE_URL,
	label: "Navigate Url",
	icon: (props: LucideProps) => (
		<Link2Icon className="stroke-orange-400" {...props} />
	),
	isEntryPoint: false,
	inputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
			required: true,
		},
		{
			name: "Url",
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
