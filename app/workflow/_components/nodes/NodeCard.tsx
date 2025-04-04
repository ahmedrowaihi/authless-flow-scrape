"use client";

import useFlowValidation from "@/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import { useReactFlow } from "@xyflow/react";

function NodeCard({
	nodeId,
	children,
	isSelected,
}: {
	nodeId: string;
	children: React.ReactNode;
	isSelected: boolean;
}) {
	const { getNode, setCenter } = useReactFlow();

	const centerNode = () => {
		const node = getNode(nodeId);
		if (!node) return;

		const { position, measured } = node;

		if (!position || !measured) return;
		const { width, height } = measured;
		const x = position.x + (width ?? 0) / 2;
		const y = position.y + (height ?? 0) / 2;
		if (x === undefined || y === undefined) return;
		setCenter(x, y, { zoom: 1, duration: 500 });
	};

	const { invalidInputs } = useFlowValidation();
	const hasInvalidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
	return (
		<div
			onDoubleClick={centerNode}
			className={cn(
				"rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs  gap-1 flex-col",
				isSelected && "border-primary",
				hasInvalidInputs && "border-destructive border-2",
			)}
		>
			{children}
		</div>
	);
}

export default NodeCard;
