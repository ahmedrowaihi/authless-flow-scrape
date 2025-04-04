"use client";

import { createWorkflow } from "@/actions/workflows";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	createWorkflowShema,
	type createWorkflowShemaType,
} from "@/schema/workflows";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function CreateWorkflowDialog({ triggeredText }: { triggeredText?: string }) {
	const [open, setOpen] = useState(false);

	const form = useForm<createWorkflowShemaType>({
		resolver: zodResolver(createWorkflowShema),
		defaultValues: {},
	});
	const { mutate, isPending } = useMutation({
		mutationFn: createWorkflow,
		onSuccess: () => {
			toast.success("Workflow created", { id: "create-workflow" });
		},
		onError: (error) => {
			toast.error("Failed to create workflow", { id: "create-workflow" });
		},
	});

	const onSubmit = useCallback(
		(values: createWorkflowShemaType) => {
			toast.loading("Creating workflow...", { id: "create-workflow" });
			mutate(values);
		},
		[mutate],
	);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				form.reset();
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button>{triggeredText ?? "Create workflow"}</Button>
			</DialogTrigger>
			<DialogContent className="px-0">
				<CustomDialogHeader
					icon={Layers2Icon}
					title="Create workflow"
					subTitle="Start building your workflow"
				/>
				<div className="p-6">
					<Form {...form}>
						<form
							className="space-y-8 w-full"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Name <p className="text-xs text-primary">(required)</p>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											Choose a descriptive and a unique name
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex gap-1 items-center">
											Description{" "}
											<p className="text-xs text-muted-foreground">
												(optinoal)
											</p>
										</FormLabel>
										<FormControl>
											<Textarea {...field} className="resize-none" />
										</FormControl>
										<FormDescription>
											Provide a brief description of what your workflow does.
											<br /> This is optional but can help you remember the
											workflow&apos;s purpose
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="w-full" disabled={isPending}>
								{!isPending ? "Proceed" : <Loader2 className="animate-spin" />}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default CreateWorkflowDialog;
