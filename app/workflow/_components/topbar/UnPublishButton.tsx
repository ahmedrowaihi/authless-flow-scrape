"use client";
import { unPublishWorkflow } from "@/actions/workflows";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { DownloadIcon } from "lucide-react";
import { toast } from "sonner";

function UnPublishButton({ workflowId }: { workflowId: string }) {
	const mutation = useMutation({
		mutationFn: unPublishWorkflow,
		onSuccess: () => {
			toast.success("Workflow published", { id: workflowId });
		},
		onError: (error: Error) => {
			toast.error(error.message || "Something went wrong", { id: workflowId });
		},
	});

	return (
		<Button
			variant={"outline"}
			className="flex items-center gap-2"
			disabled={mutation.isError}
			onClick={() => {
				toast.loading("Unpublishing workflow...", { id: workflowId });
				mutation.mutate(workflowId);
			}}
		>
			<DownloadIcon size={16} className="stroke-orange-500" /> Unpublish
		</Button>
	);
}

export default UnPublishButton;
