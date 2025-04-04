import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { CodeIcon, type LucideProps } from "lucide-react";

export const PageToHtmlTask = {
	type: TaskType.PAGE_TO_HTML,
	label: "Get HTML from the page",
	icon: (props: LucideProps) => (
		<CodeIcon className="stroke-rose-400" {...props} />
	),
	isEntryPoint: false,
	inputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
			required: true,
		},
	] as const,
	outputs: [
		{
			name: "HTML",
			type: TaskParamType.STRING,
		},
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
