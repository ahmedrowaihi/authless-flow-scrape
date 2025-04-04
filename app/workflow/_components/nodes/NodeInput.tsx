"use client";
import type { TaskParam } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Handle, Position, useEdges } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/hooks/useFlowValidation";

function NodeInput({ input, nodeId }: { input: TaskParam; nodeId: string }) {
	const edges = useEdges();
	const isConnected = edges.some(
		(edge) => edge.target === nodeId && edge.targetHandle === input.name,
	);
	const { invalidInputs } = useFlowValidation();

	// Checking for error in node and then for input field with error using name
	const hasErrors = invalidInputs
		.find((node) => node.nodeId === nodeId)
		?.inputs.find((invalidInput) => invalidInput === input.name);

	return (
		<div
			className={cn(
				"flex justify-start relative p-3 bg-secondary w-full",
				hasErrors && "bg-destructive/30",
			)}
		>
			<NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
			{!input.hideHandle && (
				<Handle
					id={input.name}
					type="target"
					position={Position.Left}
					className={cn(
						"!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
						ColorForHandle[input.type],
					)}
					isConnectable={!isConnected}
				/>
			)}
		</div>
	);
}

export default NodeInput;
