import { howItWorks } from "@/lib/data";
import type React from "react";
import { useId } from "react";

export function FeaturesGradient() {
	return (
		<div className="py-10 lg:py-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
				{howItWorks.map((feature) => (
					<div
						key={feature.title}
						className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
					>
						<Grid size={20} />
						<p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
							{feature.title}
						</p>
						<p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export const Grid = ({
	pattern,
	size,
}: {
	pattern?: number[][];
	size?: number;
}) => {
	const p = pattern ?? [
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
		[Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
	];
	return (
		<div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
			<div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-primary/30 from-primary/30 to-prifrom-primary/30 dark:to-prifrom-primary/30 opacity-100">
				<GridPattern
					width={size ?? 20}
					height={size ?? 20}
					x="-12"
					y="4"
					squares={p}
					className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-primary/10 dark:stroke-primary/10 stroke-primary/10 fill-primary"
				/>
			</div>
		</div>
	);
};

export function GridPattern({
	width = 20,
	height = 20,
	x,
	y,
	squares,
	...props
}: React.SVGProps<SVGSVGElement> & {
	squares?: number[][];
}) {
	const patternId = useId();

	return (
		<svg aria-hidden="true" {...props}>
			<defs>
				<pattern
					id={patternId}
					width={width}
					height={height}
					patternUnits="userSpaceOnUse"
					x={x}
					y={y}
				>
					<path d={`M.5 ${height}V.5H${width}`} fill="none" />
				</pattern>
			</defs>
			<rect
				width="100%"
				height="100%"
				strokeWidth={0}
				fill={`url(#${patternId})`}
			/>
			{squares && (
				<svg x={x} y={y} className="overflow-visible">
					{squares.map(([x, y]: number[]) => (
						<rect
							strokeWidth="0"
							key={`${x}-${y}`}
							width={Number(width) + 1}
							height={Number(height) + 1}
							x={x * Number(width)}
							y={y * Number(height)}
						/>
					))}
					<title>Grid Pattern</title>
				</svg>
			)}
		</svg>
	);
}
