import { useState, useEffect } from "react";

export function useToken(key: string): [string, (newValue: string) => void] {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    const [token, setToken] = useState<string>(() => {
        if (isLocalStorageAvailable) {
            const storedValue = localStorage.getItem(key);
            return storedValue ? storedValue : "";
        }
        return "";
    });

    useEffect(() => {
        if (isLocalStorageAvailable && token !== null) {
            localStorage.setItem(key, token);
        }
    }, [token, isLocalStorageAvailable, key]);

    function setStoredValue(newValue: string) {
        setToken(newValue);
        if (isLocalStorageAvailable && newValue !== null) {
            localStorage.setItem(key, newValue);
        }
    }

    return [token, setStoredValue];
}