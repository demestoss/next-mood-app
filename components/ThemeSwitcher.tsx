"use client";

import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-12" />;
    }

    return (
        <Button
            isIconOnly
            aria-label={"Theme switch"}
            type="button"
            size={"sm"}
            variant={"bordered"}
            radius={"full"}
            onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
    );
}
