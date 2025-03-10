import AppHeader from "@/components/AppHeader";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <AppHeader />
            <main className="w-full grow flex justify-center items-center">
                <div className="w-full max-w-[600px] mx-auto">
                    <h1 className="text-6xl mb-4">
                        The best Journal app, period.
                    </h1>
                    <p className="text-2xl text-default-500 mb-6">
                        This is the best app for tracking your mood through out
                        your life. All you have to do is be honest.
                    </p>
                    <div>
                        <Button
                            as={Link}
                            variant={"shadow"}
                            color={"default"}
                            href={"/journal"}
                        >
                            get started
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
