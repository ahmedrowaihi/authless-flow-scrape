import { cn } from "@/lib/utils";
import {
	BrainIcon,
	CodeIcon,
	DatabaseIcon,
	Edit3Icon,
	EyeIcon,
	FileJson2Icon,
	GlobeIcon,
	Link2Icon,
	MouseIcon,
	MousePointerClick,
	SendIcon,
	TextIcon,
} from "lucide-react";

export function FeaturesSection() {
	const features = [
		{
			title: "Launch browser",
			description:
				"Initiates a browser instance to begin the web scraping process, enabling interaction with web pages.",
			icon: <GlobeIcon className="stroke-pink-400" />,
			hoverChipClassName: "group-hover/feature:bg-pink-500",
		},
		{
			title: "Page to HTML",
			description:
				"Extracts the complete HTML content of the current page for detailed analysis and processing.",
			icon: <CodeIcon className="stroke-rose-400" />,
			hoverChipClassName: "group-hover/feature:bg-rose-500",
		},
		{
			title: "Extract text from element",
			description:
				"Retrieves the text content from a specified HTML element using a given CSS selector.",
			icon: <TextIcon className="stroke-rose-400" />,
			hoverChipClassName: "group-hover/feature:bg-rose-500",
		},
		{
			title: "Fill input",
			description:
				"Automatically fills a specified input field with a desired value, emulating user input.",
			icon: <Edit3Icon className="stroke-orange-400" />,
			hoverChipClassName: "group-hover/feature:bg-orange-500",
		},
		{
			title: "Click Element",
			description:
				"Simulates a click action on a specified HTML element, triggering any associated events or navigation.",
			icon: <MousePointerClick className="stroke-orange-400" />,
			hoverChipClassName: -'group.hover/feature:bg-"-500',
		},
		{
			title: "Scroll to element",
			description:
				"Scrolls to a specified element on the page, emulating user behavior for dynamic content loading.",
			icon: <MouseIcon className="stroke-orange-400" />,
			hoverChipClassName: "group-hover/feature:bg-orange-500",
		},
		{
			title: "Wait for element",
			description:
				"Pauses the workflow until a specified element becomes visible or hidden on the page.",
			icon: <EyeIcon className="stroke-amber-400" />,
			hoverChipClassName: "group-hover/feature:bg-amber-500",
		},
		{
			title: "Deliver via webhook",
			description:
				"Sends the scraped data to an external API endpoint through a POST request for further processing or storage.",
			icon: <SendIcon className="stroke-blue-400" />,
			hoverChipClassName: "group-hover/feature:bg-blue-500",
		},
		{
			title: "Extract data via AI",
			description:
				"Uses AI to parse HTML content and extract structured data based on a custom prompt, returning JSON output.",
			icon: <BrainIcon className="stroke-rose-400" />,
			hoverChipClassName: "group-hover/feature:bg-rose-500",
		},
		{
			title: "Read JSON",
			description:
				"Reads and retrieves a specific key or property from a JSON object for use in workflows.",
			icon: <FileJson2Icon className="stroke-orange-400" />,
			hoverChipClassName: "group-hover/feature:bg-orange-500",
		},
		{
			title: "Build JSON",
			description:
				"Adds or updates data within an existing JSON object or creates a new one with the specified properties.",
			icon: <DatabaseIcon className="stroke-orange-400" />,
			hoverChipClassName: "group-hover/feature:bg-orange-500",
		},
		{
			title: "Navigate to URL",
			description:
				"Navigates to a specified URL, loading the desired web page for scraping or interaction.",
			icon: <Link2Icon className="stroke-orange-400" />,
			hoverChipClassName: "group-hover/feature:bg-orange-500",
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
			{features.map((feature, index) => (
				<Feature
					key={feature.title}
					{...feature}
					index={index}
					hoverChipClassName={feature.hoverChipClassName as string}
				/>
			))}
		</div>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
	hoverChipClassName,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
	hoverChipClassName?: string;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800",
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
				{icon}
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div
					className={cn(
						"absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center",
						hoverChipClassName,
					)}
				/>
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
					{title}
				</span>
			</div>
			<p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
				{description}
			</p>
		</div>
	);
};
