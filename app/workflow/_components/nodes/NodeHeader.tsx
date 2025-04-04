"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AppNode, TaskType } from "@/lib/types";
import { createFlowNode } from "@/lib/workflow/CreateFlowNode";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { useReactFlow } from "@xyflow/react";
import { CopyIcon, GripVerticalIcon, TrashIcon } from "lucide-react";
import { Fragment } from "react";

function NodeHeader({
	taskType,
	nodeId,
}: {
	taskType: TaskType;
	nodeId: string;
}) {
	const task = TaskRegistry[taskType];

	const { deleteElements, getNode, addNodes } = useReactFlow();

	const copyNode = () => {
		const node = getNode(nodeId) as AppNode;
		const newX = node.position.x;
		const newY = node.position.y + (node.measured?.height ?? 0) + 20;
		const newNode = createFlowNode(node.data.type, { x: newX, y: newY });
		addNodes([newNode]);
	};

	return (
		<div className="flex items-center gap-2 p-2">
			<task.icon size={16} />
			<div className="flex items-center justify-between w-full gap-1">
				<p className="text-xs font-bold uppercase text-muted-foreground">
					{task.label}
				</p>
				<div className="flex gap-1 items-center">
					{task.isEntryPoint && <Badge className="py-1">Entry Point</Badge>}
					{!task.isEntryPoint && (
						<Fragment>
							<Button
								variant={"ghost"}
								size={"icon"}
								onClick={() =>
									deleteElements({
										nodes: [{ id: nodeId }],
									})
								}
							>
								<TrashIcon size={12} />
							</Button>
							<Button variant={"ghost"} size={"icon"} onClick={copyNode}>
								<CopyIcon size={12} />
							</Button>
						</Fragment>
					)}
					<Button
						variant={"ghost"}
						size={"icon"}
						className="drag-handle cursor-grab"
					>
						<GripVerticalIcon size={20} />
					</Button>
				</div>
			</div>
		</div>
	);
}

export default NodeHeader;
