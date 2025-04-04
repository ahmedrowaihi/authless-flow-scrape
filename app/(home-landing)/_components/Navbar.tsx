"use client";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { headerRoutes } from "@/lib/data";
import { MenuIcon, XIcon, ZapIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

function Navbar() {
	const scrollIntoView = (ele: string) => {
		const element = document.getElementById(ele.substring(1));

		if (!element) return;
		element.scrollIntoView({
			behavior: "smooth",
		});
	};

	const isMobile = useIsMobile();
	useEffect(() => {
		setIsMobileOpen(false);
	}, [isMobile]);

	const [isMobileOpen, setIsMobileOpen] = useState(false);

	if (isMobile) {
		return (
			<div className="p-5 sticky top-0 left-0 z-50">
				{!isMobileOpen ? (
					<MenuIcon className="" onClick={() => setIsMobileOpen(true)} />
				) : (
					<aside className="h-screen w-full box-border p-5 backdrop-blur-md absolute top-0 left-0 z-50">
						<XIcon onClick={() => setIsMobileOpen(false)} />
						<div className="mt-5 flex flex-col gap-5 h-full text-center items-center pt-60">
							{headerRoutes.map((route) =>
								route?.button ? (
									<Button
										key={route.href}
										className="hover:bg-white group w-max"
									>
										<Link
											className="text-lg font-light text-white group-hover:text-primary"
											href={route.href}
										>
											{route.title}
										</Link>
									</Button>
								) : (
									// biome-ignore lint/a11y/useKeyWithClickEvents: let's not use key with click events
									<span
										className="text-lg font-light hover:text-white cursor-pointer select-none"
										key={route.href}
										onClick={() => {
											scrollIntoView(route.href);
										}}
									>
										{route.title}
									</span>
								),
							)}
						</div>
					</aside>
				)}
			</div>
		);
	}

	return (
		<header className="px-4 lg:px-6 h-14 flex items-center max-w-screen-xl mx-auto w-full text-primary py-10 sticky top-0 backdrop-blur-sm z-50">
			<Link className="flex items-center justify-center" href="#">
				<ZapIcon className="h-8 w-8" />
				<span className="ml-2 text-white">Flow Scrape</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6 items-center">
				{headerRoutes.map((route) =>
					route?.button ? (
						<Link
							className="text-sm font-medium text-white group-hover:text-primary"
							href={route.href}
							key={route.href}
						>
							<Button className="hover:bg-white group text-white hover:text-primary">
								{route.title}
							</Button>
						</Link>
					) : (
						// biome-ignore lint/a11y/useKeyWithClickEvents: let's not use key with click events
						<span
							className="text-sm font-medium hover:text-white cursor-pointer select-none"
							key={route.href}
							onClick={() => {
								scrollIntoView(route.href);
							}}
						>
							{route.title}
						</span>
					),
				)}
			</nav>
		</header>
	);
}

export default Navbar;
