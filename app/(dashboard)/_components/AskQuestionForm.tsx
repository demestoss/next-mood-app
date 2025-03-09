import { Button } from "@heroui/react";

export default function AskQuestionForm() {
	return (
		<div className="flex flex-col gap-4 p-4">
			<h1 className="text-lg">Ask a question</h1>
			<p className="text-default-300">
				Ask a question to get help from the community.
			</p>
			<Button color="primary">Ask a question</Button>
		</div>
	);
}
