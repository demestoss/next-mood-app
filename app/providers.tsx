"use client";
import AuthProvider from "@/app/(auth)/AuthProvider";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="light">
                <AuthProvider>{children}</AuthProvider>
            </NextThemesProvider>
        </HeroUIProvider>
    );
}
