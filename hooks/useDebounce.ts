import { useState, useCallback } from "react";

export function useDebounce<T>(delay: number = 300) {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const debounce = useCallback(
        (callback: () => void) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            const id = setTimeout(callback, delay);
            setTimeoutId(id);
        },
        [delay, timeoutId]
    );

    return debounce;
}
