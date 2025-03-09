"use client";
import { Link as LinkView, NavbarItem, cn } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
	href,
	children,
}: { href: string; children: React.ReactNode }) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<NavbarItem isActive={isActive}>
			<LinkView as={Link} href={href} color={"foreground"}>
				{children}
			</LinkView>
		</NavbarItem>
	);
}
