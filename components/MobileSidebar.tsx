"use client";
import { routes } from "@/lib/data";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";

function MobileSidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	// const activeRoute =
	//   routes.find(
	//     (route) => route.href.length > 0 && pathname.includes(route.href)
	//   ) || routes[0];

	return (
		<div className="block border-separate bg-background md:hidden">
			<nav className="flex container items-center justify-between px-8">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger asChild>
						<Button variant="ghost" size="icon">
							<MenuIcon />
						</Button>
					</SheetTrigger>
					<SheetContent
						className="w-[400px] sm:w-[540px] space-y-4"
						side="left"
					>
						<Logo />
						<div className="flex flex-col gap-1">
							{routes.map((route) => (
								<Link
									key={route.href}
									href={route.href}
									className={buttonVariants({
										variant:
											pathname === route.href
												? "sidebarActiveitem"
												: "sidebarItem",
									})}
									onClick={() => setIsOpen((prev) => !prev)}
								>
									<route.icon size={20} />
									{route.label}
								</Link>
							))}
						</div>
					</SheetContent>
				</Sheet>
			</nav>
		</div>
	);
}

export default MobileSidebar;
