import {useState, useEffect} from "react";

export function useToken() : [string, (newValue: string) => void] {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    //console.log("The true intital value " + initialValue)

    const storedValue = isLocalStorageAvailable ? localStorage.getItem('token') : null;

    //console.log("The stored value " + storedValue)

    const initial = storedValue ? storedValue : "null";

    const [token, setToken] = useState(initial);
  
    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem('token', token);
        }
    }, [token, isLocalStorageAvailable]);
  
    function setStoredValue(newValue:string) {
        setToken(newValue);
        if (isLocalStorageAvailable) {
            localStorage.setItem('token', newValue);
        }
    }
    return [token, setStoredValue];
  }
  
  