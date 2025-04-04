import { HomeIcon, Layers2Icon, ShieldCheckIcon } from "lucide-react";

export const routes = [
	{
		href: "/home",
		label: "Home",
		icon: HomeIcon,
	},
	{
		href: "/workflows",
		label: "Workflows",
		icon: Layers2Icon,
	},
	{
		href: "/credentials",
		label: "Credentials",
		icon: ShieldCheckIcon,
	},
];

export const MONTH_NAME = [
	"Janauary",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const typeWriterWords = [
	{
		text: "Build",
	},
	{
		text: "Powerful",
	},
	{
		text: "Web",
		className: "text-primary dark:text-primary",
	},
	{
		text: "Scraping",
		className: "text-primary dark:text-primary",
	},
	{
		text: "Workflows.",
	},
];

export const howItWorks = [
	{
		title: "Build Your Workflow",
		description:
			"Create powerful workflows with intuitive tools and actions, simplifying complex scraping tasks.",
	},
	{
		title: "Scrape with Precision",
		description:
			"Extract data efficiently from any web page using advanced tools, including AI-powered data extraction.",
	},

	{
		title: "Automate and Optimize",
		description:
			"Schedule workflows, monitor execution stats, and optimize processes for maximum efficiency.",
	},
	{
		title: "Deliver Anywhere",
		description:
			"Send your scraped data directly to APIs, webhooks, or your preferred storage seamlessly.",
	},
];

export const headerRoutes = [
	{
		title: "How it works",
		href: "#howItWorks",
		className: "",
	},
	{
		title: "Scraping Features",
		href: "#scrapingFeatures",
		className: "",
	},
	{
		title: "Get Started",
		href: "/workflows",
		className: "",
		button: true,
	},
];
