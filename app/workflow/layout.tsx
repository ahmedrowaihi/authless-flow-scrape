import Logo from "@/components/Logo";
import { ModeToggle } from "@/components/ThemeToggle";
import { Separator } from "@/components/ui/separator";
import type React from "react";

function WorkflowLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col w-full h-screen">
			{children}
			<Separator />
			<footer className="flex items-center justify-between p-2">
				<Logo iconSize={16} fontSize="text-xl" />
				<ModeToggle />
			</footer>
		</div>
	);
}

export default WorkflowLayout;
