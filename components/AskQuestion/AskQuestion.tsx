'use client';
import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Bot } from "lucide-react";
import AskQuestionForm from "./AskQuestionForm";

export default function AskQuestion() {
	return (
		<div className="fixed bottom-5 right-4">
			<Popover shouldCloseOnBlur={false} shouldCloseOnInteractOutside={() => false}>
				<PopoverTrigger>
					<Button
						isIconOnly
						aria-label="Like"
						color="primary"
						variant="flat"
						size="lg"
					>
						<Bot />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="h-[600px] w-96 p-0 bg-content2">
					<AskQuestionForm />
				</PopoverContent>
			</Popover>
		</div>
	);
}
