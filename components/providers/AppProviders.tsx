"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import type React from "react";
import { useState } from "react";

export function AppProviders({ children }: { children: React.ReactNode }) {
	const [queryClient, setQueryClient] = useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<NextTopLoader color="#10b981" showSpinner={false} />
			<ThemeProvider attribute="class" defaultTheme="system">
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
}
