"use client";
import { runWorkflow } from "@/actions/runWorkflow";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { PlayIcon } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExecuteButton({ workflowId }: { workflowId: string }) {
	const generateExecutionPlan = useExecutionPlan();
	const mutation = useMutation({
		mutationFn: runWorkflow,
		onSuccess: () => {
			toast.success("Execution Started", { id: "flow-execution" });
		},
		onError: () => {
			toast.error("Something went wrong", { id: "flow-execution" });
		},
	});

	const { toObject } = useReactFlow();

	return (
		<Button
			variant={"outline"}
			className="flex items-center gap-2"
			disabled={mutation.isError}
			onClick={() => {
				const plan = generateExecutionPlan();
				if (!plan) return;
				toast.success("Starting execution...", { id: "flow-execution" });
				mutation.mutate({
					workflowId,
					flowDefinition: JSON.stringify(toObject()),
				});
			}}
		>
			<PlayIcon size={16} className="stroke-orange-400" /> Execute
		</Button>
	);
}

export default ExecuteButton;
