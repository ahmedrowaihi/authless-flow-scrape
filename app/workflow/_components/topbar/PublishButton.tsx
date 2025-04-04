"use client";
import { publishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import useExecutionPlan from "@/hooks/useExecutionPlan";
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { UploadIcon } from "lucide-react";
import { toast } from "sonner";

function PublishButton({ workflowId }: { workflowId: string }) {
	const generateExecutionPlan = useExecutionPlan();
	const mutation = useMutation({
		mutationFn: publishWorkflow,
		onSuccess: () => {
			toast.success("Workflow published", { id: workflowId });
		},
		onError: (error: Error) => {
			toast.error(error.message || "Something went wrong", { id: workflowId });
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
				toast.loading("Publishing workflow...", { id: workflowId });
				mutation.mutate({
					id: workflowId,
					flowDefinition: JSON.stringify(toObject()),
				});
			}}
		>
			<UploadIcon size={16} className="stroke-green-400" /> Publish
		</Button>
	);
}

export default PublishButton;
