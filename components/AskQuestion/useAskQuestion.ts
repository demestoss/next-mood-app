import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";

function askQuestion(url: string, question: string) {
	return fetch(url, {
		method: "POST",
		body: JSON.stringify({ question }),
	});
}

type Result = {
	question: string;
	answer: string;
};

export function useAskQuestion() {
	const [results, setResults] = useState<Result[]>([]);

	const addNewQuestion = useCallback((question: string) => {
		setResults((prev) => [
			...prev,
			{
				question,
				answer: "Asking question...",
			},
		]);
	}, []);

	const setLastResult = useCallback((result: string) => {
		setResults((prev) => [
			...prev.slice(0, -1),
			{
				question: prev[prev.length - 1].question,
				answer: result,
			},
		]);
	}, []);

	const { error, isMutating, trigger } = useSWRMutation(
		"api/question",
		async (url, { arg }: { arg: string }) => {
			addNewQuestion(arg);
			const res = await askQuestion(url, arg);
			const reader = res.body?.getReader();
			if (!reader) {
				throw new Error("Failed to get response. Please try again later.");
			}

			const decoder = new TextDecoder();
			let data = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) {
					break;
				}
				data += decoder.decode(value, { stream: true });
				setLastResult(data);
			}
		},
	);

	return {
		results,
		error,
		isPending: isMutating,
		askQuestion: trigger,
	};
}
