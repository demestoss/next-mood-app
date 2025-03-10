import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface AutoSaveParams<TData> {
    data: TData;
    onSave: (value: TData) => Promise<void>;
    interval?: number;
    enabled?: boolean;
}

export function useAutoSave<TData>({
    data,
    onSave,
    enabled = true,
    interval = 2000,
}: AutoSaveParams<TData>) {
    const initialRender = useRef(true);
    const handleSave = useRef(onSave);
    const valueOnCleanup = useRef(data);
    const enabledRef = useRef(enabled);

    useLayoutEffect(() => {
        enabledRef.current = enabled;
    }, [enabled]);
    useLayoutEffect(() => {
        handleSave.current = onSave;
    }, [onSave]);
    useLayoutEffect(() => {
        valueOnCleanup.current = data;
    }, [data]);

    const [debouncedData, setDebouncedData] = useDebounce(data, interval);

    useHotkeys(
        "mod+s",
        () => {
            setDebouncedData();
        },
        {
            preventDefault: true,
            enableOnFormTags: true,
        },
    );

    useEffect(() => {
        if (!enabledRef.current) {
            return;
        }
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            handleSave.current(debouncedData);
        }
    }, [debouncedData]);

    useEffect(
        () => () => {
            if (!enabledRef.current) {
                return;
            }
            handleSave.current(valueOnCleanup.current);
        },
        [],
    );
}

function useDebounce<TData>(data: TData, delay: number) {
    const [liveData, setLiveData] = useState<TData>(data);
    const timeout = useRef<number | null>(null);

    const clearTimeout = useCallback(() => {
        if (timeout.current) {
            window.clearTimeout(timeout.current);
            timeout.current = null;
        }
    }, []);

    const setDebouncedData = useCallback(() => {
        clearTimeout();
        setLiveData(data);
    }, [data, clearTimeout]);

    useEffect(() => {
        timeout.current = window.setTimeout(() => {
            setLiveData(data);
        }, delay);
        return () => {
            clearTimeout();
        };
    }, [data, delay, clearTimeout]);

    return [liveData, setDebouncedData] as const;
}
