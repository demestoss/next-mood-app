"use client";
import { Button, Code, Textarea } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import { useActionState } from "react";
import { sendQuestion } from "../_actions";

type ActionState = {
	response?: string;
	error?: string;
};

const initialState: ActionState = {
	response: "",
	error: "",
};

export default function AskQuestionForm() {
	const [{ response, error }, action, isPending] = useActionState(
		sendQuestion,
		initialState,
	);

	return (
		<div className="h-full w-full flex flex-col gap-4 p-4">
			<h1 className="text-lg">Ask your journal</h1>

			<div className="grow">
				{!response && !isPending && (
					<div>
						<span>Write a question and hit </span>
						<Code>Enter</Code> key
					</div>
				)}
				{isPending && <div>Getting the response...</div>}
				{!isPending && response && <div>{response}</div>}
			</div>

			<form action={action} className="flex flex-col gap-2 relative">
				{error && <div className="text-tiny text-danger">{error}</div>}

				<Textarea
					disabled={isPending}
					variant="faded"
					isClearable
					name="question"
					placeholder="Write a question"
				/>

				<div className="absolute right-1 bottom-1">
					<Button
						disabled={isPending}
						isIconOnly
						variant="light"
						color="default"
						aria-label="Send question"
						size="sm"
						type="submit"
					>
						<SendHorizonal className="size-5" />
					</Button>
				</div>
			</form>
		</div>
	);
}
