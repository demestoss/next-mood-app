import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface AutoSaveParams<TData> {
	data: TData;
	onSave: (value: TData) => Promise<void>;
	interval?: number;
}

export function useAutoSave<TData>({
	data,
	onSave,
	interval = 2000,
}: AutoSaveParams<TData>) {
	const initialRender = useRef(true);
	const handleSave = useRef(onSave);
	const valueOnCleanup = useRef(data);

	useLayoutEffect(() => {
		handleSave.current = onSave;
	}, [onSave]);
	useLayoutEffect(() => {
		valueOnCleanup.current = data;
	}, [data]);

	const debouncedData = useDebounce(data, interval);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			handleSave.current(debouncedData);
		}
	}, [debouncedData]);

	useEffect(
		() => () => {
			handleSave.current(valueOnCleanup.current);
		},
		[],
	);
}

function useDebounce<TData>(data: TData, delay: number) {
	const [liveData, setLiveData] = useState<TData>(data);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLiveData(data);
		}, delay);
		return () => {
			clearTimeout(timeout);
		};
	}, [data, delay]);

	return liveData;
}
