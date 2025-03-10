"use client";
import { Button, Code, Textarea } from "@heroui/react";
import { SendHorizonal } from "lucide-react";
import { useCallback, useRef } from "react";
import { useAskQuestion } from "./useAskQuestion";

export default function AskQuestionForm() {
	const formRef = useRef<HTMLFormElement>(null);
	const { askQuestion, results, error, isPending } = useAskQuestion();

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const formData = new FormData(e.currentTarget);
			const question = formData.get("question") as string;
			askQuestion(question);
		},
		[askQuestion],
	);

	return (
		<div className="h-full w-full flex flex-col gap-4 p-4">
			<h1 className="text-lg">Ask your journal</h1>

			<div className="grow overflow-x-auto">
				{results.length === 0 && !isPending && (
					<div>
						<span>Write a question and hit </span>
						<Code>Enter</Code> key
					</div>
				)}
				<div className="flex flex-col w-full gap-3">
					{results.map((result, idx) => (
						<div key={idx} className="w-full flex flex-col gap-3">
							<div className="text-end">{result.question}</div>
							<div className="">{result.answer}</div>
						</div>
					))}
				</div>
			</div>

			<form
				ref={formRef}
				onSubmit={onSubmit}
				className="flex flex-col gap-2 relative"
			>
				{error && <div className="text-tiny text-danger">{error}</div>}

				<Textarea
					disabled={isPending}
					variant="faded"
					name="question"
					placeholder="Write a question"
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							formRef.current?.requestSubmit();
							formRef.current?.reset();
						}
					}}
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
