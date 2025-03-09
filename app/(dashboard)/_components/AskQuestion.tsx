import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Bot } from "lucide-react";
import AskQuestionForm from "./AskQuestionForm";

export default function AskQuestion() {
	return (
		<div className="fixed bottom-4 right-2">
			<Popover>
				<PopoverTrigger>
					<Button
						isIconOnly
						aria-label="Like"
						color="secondary"
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
