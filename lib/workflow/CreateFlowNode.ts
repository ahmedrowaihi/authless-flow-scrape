import type { AppNode, TaskType } from "../types";

export function createFlowNode(
	nodeType: TaskType,
	position?: { x: number; y: number },
): AppNode {
	return {
		id: crypto.randomUUID(),
		data: {
			type: nodeType,
			inputs: {},
		},
		position: position ?? { x: 0, y: 0 },
		type: "FlowScrapeNode",
		dragHandle: ".drag-handle",
	};
}
