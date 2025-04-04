import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Flow srape",
	description: "Build your own flow and scrape data with ease",
	openGraph: {
		images: `${process.env.APP_URL}/og-image.png`,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AppProviders>{children}</AppProviders>
			</body>
			<Toaster richColors />
		</html>
	);
}
