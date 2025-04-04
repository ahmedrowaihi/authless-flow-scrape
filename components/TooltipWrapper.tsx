"use client";
import type React from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
	children: React.ReactNode;
	content: string;
	side?: "top" | "bottom" | "left" | "right";
}

function TooltipWrapper(props: Props) {
	if (!props.content) return props.children;
	return (
		<TooltipProvider delayDuration={0}>
			<Tooltip>
				<TooltipTrigger asChild>{props.children}</TooltipTrigger>
				<TooltipContent side={props.side}>{props.content}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}

export default TooltipWrapper;
