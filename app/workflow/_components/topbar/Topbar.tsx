"use client";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Fragment } from "react";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";
import NavigationTabs from "./NavigationTabs";
import PublishButton from "./PublishButton";
import UnPublishButton from "./UnPublishButton";

interface Props {
	title: string;
	subtitle?: string;
	workflowId: string;
	hideButtons?: boolean;
	isPublished?: boolean;
}

function Topbar({
	title,
	subtitle,
	workflowId,
	hideButtons = false,
	isPublished = false,
}: Props) {
	const router = useRouter();

	return (
		<header className="flex p-2 border-b-2 border-separate justify-between w-full h-[60px] sticky top-0 bg-background z-10">
			<div className="flex gap-1 flex-1">
				<TooltipWrapper content="Black">
					<Button variant={"ghost"} size={"icon"} onClick={() => router.back()}>
						<ChevronLeftIcon size={30} />
					</Button>
				</TooltipWrapper>
				<div className="">
					<p className="font-bold text-ellipsis truncate">{title}</p>
					{subtitle && (
						<p className="text-xs text-muted-foreground truncate text-ellipsis">
							{subtitle}
						</p>
					)}
				</div>
			</div>
			<NavigationTabs workflowId={workflowId} />
			<div className="flex gap-1 flex-1 justify-end">
				{!hideButtons && (
					<Fragment>
						<ExecuteButton workflowId={workflowId} />
						{isPublished && <UnPublishButton workflowId={workflowId} />}
						{!isPublished && (
							<Fragment>
								<SaveButton workflowId={workflowId} />
								<PublishButton workflowId={workflowId} />
							</Fragment>
						)}
					</Fragment>
				)}
			</div>
		</header>
	);
}

export default Topbar;
