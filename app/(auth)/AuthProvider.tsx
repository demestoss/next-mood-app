"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function AuthProvider({ children }: React.PropsWithChildren) {
	const { theme } = useTheme();
	return (
		<ClerkProvider
			appearance={{
				baseTheme: theme === "dark" ? dark : undefined,
			}}
		>
			{children}
		</ClerkProvider>
	);
}
