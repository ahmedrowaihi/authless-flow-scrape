import type { AppNodeData } from "@/lib/types";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import type { NodeProps } from "@xyflow/react";
import { memo } from "react";
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import NodeInput from "./NodeInput";
import NodeOutput from "./params/NodeOutput";
import NodeIO from "./NodeIO";
import { Badge } from "@/components/ui/badge";

const DEV_MODE = process?.env?.NEXT_PUBLIC_DEV_MODE === "true";

const NodeComponent = memo((props: NodeProps) => {
	const nodeData = props.data as AppNodeData;
	const task = TaskRegistry[nodeData.type];

	return (
		<NodeCard nodeId={props.id} isSelected={!!props.selected}>
			{DEV_MODE && <Badge>DEV:{props.id}</Badge>}
			<NodeHeader taskType={nodeData.type} nodeId={props.id} />
			<NodeIO>
				{task.inputs.map((input) => (
					<NodeInput input={input} key={input.name} nodeId={props.id} />
				))}
			</NodeIO>
			<NodeIO>
				{task.outputs.map((output) => (
					<NodeOutput output={output} key={output.name} />
				))}
			</NodeIO>
		</NodeCard>
	);
});

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
