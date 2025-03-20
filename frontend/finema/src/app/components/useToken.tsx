import {useState, useEffect} from "react";

export function useToken(key : string) : [string, (newValue: string) => void] {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    const storedValue = isLocalStorageAvailable ? localStorage.getItem(key) : null;

    const initial = storedValue ? storedValue : "";

    const [token, setToken] = useState(initial);
  
    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem(key, token);
        }
    }, [token, isLocalStorageAvailable]);
  
    function setStoredValue(newValue:string) {
        setToken(newValue);
        if (isLocalStorageAvailable) {
            localStorage.setItem(key, newValue);
        }
    }
    return [token, setStoredValue];
  }
  
  