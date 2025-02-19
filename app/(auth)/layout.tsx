import AppHeader from "@/components/AppHeader";

export default function AuthLayout({ children }: React.PropsWithChildren) {
	return (
		<>
			<AppHeader />
			<main className="w-full grow flex justify-center items-center">
				{children}
			</main>
		</>
	);
}
