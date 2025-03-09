import { Button, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Bot } from "lucide-react";
import AskQuestionForm from "./AskQuestionForm";

export default function AskQuestion() {
	return (
		<div className="fixed bottom-4 right-2">
			<Popover>
				<PopoverTrigger>
					<Button isIconOnly aria-label="Like" color="default" size="lg">
						<Bot />
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<AskQuestionForm />
				</PopoverContent>
			</Popover>
		</div>
	);
}
