import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({ children }: React.PropsWithChildren) {
	return (
		<div className="h-full w-full grid grid-cols-[200px_1fr]">
			<aside className="h-full border-r border-default-100">Mood</aside>

			<div>
				<header className="h-[60px] border-b border-default-100">
					<div className="px-6 flex h-full w-full items-center justify-end gap-4">
						<ThemeSwitcher />
						<UserButton />
					</div>
				</header>

				<main>{children}</main>
			</div>
		</div>
	);
}
