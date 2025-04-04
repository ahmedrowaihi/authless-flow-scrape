"use client";
import type { Workflow } from "@prisma/client";
import {
	addEdge,
	Background,
	BackgroundVariant,
	type Connection,
	Controls,
	type Edge,
	getOutgoers,
	ReactFlow,
	useEdgesState,
	useNodesState,
	useReactFlow,
} from "@xyflow/react";
import type React from "react";
import { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import type { AppNode, TaskType } from "@/lib/types";
import { createFlowNode } from "@/lib/workflow/CreateFlowNode";
import NodeComponent from "./nodes/NodeComponent";
import DeletableEdge from "./edges/DeletableEdge";
import { TaskRegistry } from "@/lib/workflow/task/Registry";

const nodeTypes = {
	FlowScrapeNode: NodeComponent,
};
const edgeTypes = {
	default: DeletableEdge,
};

const snapgird: [number, number] = [50, 50];

const fitViewOptions = { padding: 1 };

function FlowEditor({ workflow }: { workflow: Workflow }) {
	const [nodes, setNodes, onNodesChange] = useNodesState<AppNode>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
	const { setViewport, screenToFlowPosition, updateNodeData } = useReactFlow();

	useEffect(() => {
		try {
			const flow = JSON.parse(workflow.definition);
			if (!flow) return;
			setNodes(flow.nodes || []);
			setEdges(flow.edges || []);

			//TODO:  Optional flow for restoring the view-port used by user for project
			// if (!flow.viewport) return;
			// const { x = 0, y = 0, zoom = 1 } = flow.viewport;
			// setViewport({ x, y, zoom });
		} catch (error) {}
	}, [workflow, setEdges, setNodes, setViewport]);

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();
			const taskType = event.dataTransfer.getData("application/reactflow");
			if (typeof taskType === "undefined" || !taskType) return;

			const position = screenToFlowPosition({
				x: event.clientX,
				y: event.clientY,
			});

			const newNode = createFlowNode(taskType as TaskType, position);
			setNodes((nds) => nds.concat(newNode));
		},
		[setNodes, screenToFlowPosition],
	);

	const onConnect = useCallback(
		(connection: Connection) => {
			setEdges((eds) => addEdge({ ...connection, animated: true }, eds));
			if (!connection.targetHandle) return;
			const node = nodes.find((node) => node.id === connection.target);
			if (!node) return;
			const nodeInputs = node.data.inputs;
			updateNodeData(node.id, {
				inputs: {
					...nodeInputs,
					[connection.targetHandle]: "",
				},
			});
		},

		[setEdges, updateNodeData, nodes],
	);

	const isValidConnection = useCallback(
		(connection: Edge | Connection) => {
			// No self-connection
			if (connection.source === connection.target) return false;

			// Same type connections
			const sourceNode = nodes.find((node) => node.id === connection.source);
			const targetNode = nodes.find((node) => node.id === connection.target);

			if (!sourceNode || !targetNode) {
				console.log("Source or target not found");
				return false;
			}

			const sourceTask = TaskRegistry[sourceNode.data.type];
			const targetTask = TaskRegistry[targetNode.data.type];

			const output = sourceTask.outputs.find(
				(o) => o.name === connection.sourceHandle,
			);
			const input = targetTask.inputs.find(
				(i) => i.name === connection.targetHandle,
			);

			if (input?.type !== output?.type) {
				console.log("Invalid connection");
				return false;
			}

			// Avoid cyclic connections :: DOCS_GRAPH
			const hasCycle = (node: AppNode, visited = new Set()) => {
				if (visited.has(node.id)) return false;

				visited.add(node.id);

				for (const outgoer of getOutgoers(node, nodes, edges)) {
					if (outgoer.id === connection.source) return true;
					if (hasCycle(outgoer, visited)) return true;
				}
			};

			const detectedCycle = hasCycle(targetNode);
			return !detectedCycle;
		},

		[nodes, edges],
	);

	return (
		<main className="h-full w-full">
			<ReactFlow
				nodes={nodes}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onNodesChange={onNodesChange}
				nodeTypes={nodeTypes}
				edgeTypes={edgeTypes}
				snapToGrid
				snapGrid={snapgird}
				fitView
				fitViewOptions={fitViewOptions}
				onDragOver={onDragOver}
				onDrop={onDrop}
				onConnect={onConnect}
				isValidConnection={isValidConnection}
			>
				<Controls position="top-left" fitViewOptions={fitViewOptions} />
				<Background variant={BackgroundVariant.Dots} gap={12} size={1} />
			</ReactFlow>
		</main>
	);
}

export default FlowEditor;
