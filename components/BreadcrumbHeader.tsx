"use client";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "./ui/breadcrumb";
import MobileSidebar from "./MobileSidebar";

function BreadcrumbHeader() {
	const pathname = usePathname();
	const paths = pathname === "/" ? [""] : pathname?.split("/");

	return (
		<div className="flex items-center flex-start">
			<MobileSidebar />
			<Breadcrumb>
				<BreadcrumbList>
					{paths.map((path, index) => (
						<Fragment key={path}>
							<BreadcrumbItem>
								<BreadcrumbLink className="capitalize" href={`/${path}`}>
									{path === "" ? "Home" : path}
								</BreadcrumbLink>
							</BreadcrumbItem>
							{index !== paths.length - 1 && <BreadcrumbSeparator />}
						</Fragment>
					))}
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
}

export default BreadcrumbHeader;
