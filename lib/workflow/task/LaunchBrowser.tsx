import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { GlobeIcon, type LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
	type: TaskType.LAUNCH_BROWSER,
	label: "Launch Browser",
	icon: (props: LucideProps) => (
		<GlobeIcon className="stroke-pink-400" {...props} />
	),
	isEntryPoint: true,
	inputs: [
		{
			name: "Website Url",
			type: TaskParamType.STRING,
			helperText: "eg: https://www.google.com",
			required: true,
			hideHandle: true,
		},
	] as const,
	outputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
