import { TaskParamType, TaskType, type WorkflowTask } from "@/lib/types";
import { EyeIcon, type LucideProps } from "lucide-react";

export const WaitForElementTask = {
	type: TaskType.WAIT_FOR_ELEMENT,
	label: "Wait For Element",
	icon: (props: LucideProps) => (
		<EyeIcon className="stroke-amber-400" {...props} />
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
			name: "Visiblity",
			type: TaskParamType.SELECT,
			required: true,
			hideHandle: true,
			options: [
				{
					label: "Visible",
					value: "visible",
				},
				{
					label: "Hidden",
					value: "hidden",
				},
			],
		},
	] as const,
	outputs: [
		{
			name: "Web page",
			type: TaskParamType.BROWSE_INSTANCE,
		},
	] as const,
} satisfies WorkflowTask;
