"use client";
import React, { useState } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { deleteCredential } from "@/actions/credentials";
import { toast } from "sonner";
import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

interface Props {
	crendentialName: string;
	credentialId: string;
}

function DeleteCredentialDialog({ crendentialName, credentialId }: Props) {
	const [confirmText, setConfirmText] = useState("");
	const [open, setOpen] = useState(false);

	const deleteMutation = useMutation({
		mutationFn: deleteCredential,
		onSuccess: () => {
			toast.success("Credential deleted successfully", { id: credentialId });
			setConfirmText("");
		},
		onError: () => {
			toast.error("Failed to delete credential", { id: credentialId });
		},
	});

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} size={"icon"}>
					<XIcon size={18} />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						If you delete this credential, you will not be able to recover it.
						<div className="flex flex-col py-4 gap-2">
							<p>
								If you are sure, enter <b>{crendentialName}</b> to confirm.
							</p>
							<Input
								value={confirmText}
								onChange={(e) => setConfirmText(e.target.value)}
							/>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setConfirmText("")}>
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={
							confirmText !== crendentialName || deleteMutation.isPending
						}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={() => {
							toast.loading("Deleting credential...", { id: credentialId });
							deleteMutation.mutate(credentialId);
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteCredentialDialog;
