"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/Registry";

function TaskMenu() {
	return (
		<aside className="w-[340px] min-w-[340px] max-w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
			<Accordion
				type="multiple"
				className="w-full"
				defaultValue={[
					"extraction",
					"interactions",
					"timings",
					"results",
					"storage",
				]}
			>
				<AccordionItem value="interactions">
					<AccordionTrigger className="font-bold">
						User Interactions
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-1">
						<TaskMenuButton taskType={TaskType.FILL_INPUT} />
						<TaskMenuButton taskType={TaskType.CLICK_ELEMENT} />
						<TaskMenuButton taskType={TaskType.NAVIGATE_URL} />
						<TaskMenuButton taskType={TaskType.SCROLL_TO_ELEMENT} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="extraction">
					<AccordionTrigger className="font-bold">
						Data Extraction
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-1">
						<TaskMenuButton taskType={TaskType.PAGE_TO_HTML} />
						<TaskMenuButton taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
						<TaskMenuButton taskType={TaskType.EXTRACT_DATA_WITH_AI} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="storage">
					<AccordionTrigger className="font-bold">
						Data Storage
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-1">
						<TaskMenuButton taskType={TaskType.READ_PROPERTY_FROM_JSON} />
						<TaskMenuButton taskType={TaskType.ADD_PROPERTY_TO_JSON} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="timings">
					<AccordionTrigger className="font-bold">
						Timing Controls
					</AccordionTrigger>
					<AccordionContent className="flex flex-col gap-1">
						<TaskMenuButton taskType={TaskType.WAIT_FOR_ELEMENT} />
					</AccordionContent>
					<AccordionItem value="results">
						<AccordionTrigger className="font-bold">
							Result delivery
						</AccordionTrigger>
						<AccordionContent className="flex flex-col gap-1">
							<TaskMenuButton taskType={TaskType.DELIVER_VIA_WEBHOOK} />
						</AccordionContent>
					</AccordionItem>
				</AccordionItem>
			</Accordion>
		</aside>
	);
}

export default TaskMenu;

function TaskMenuButton({ taskType }: { taskType: TaskType }) {
	const task = TaskRegistry[taskType];
	const onDragStart = (event: React.DragEvent) => {
		event.dataTransfer.setData("application/reactflow", taskType);
		event.dataTransfer.effectAllowed = "move";
	};
	return (
		<Button
			variant={"secondary"}
			className="flex justify-between items-center gap-2 border w-full"
			draggable
			onDragStart={onDragStart}
		>
			<div className="flex gap-2">
				<task.icon size={20} />
				{task.label}
			</div>
		</Button>
	);
}
