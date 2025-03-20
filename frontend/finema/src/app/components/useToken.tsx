import {useState, useEffect} from "react";

export function useToken() {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    //console.log("The true intital value " + initialValue)

    const storedValue = isLocalStorageAvailable ? localStorage.getItem('token') : null;

    //console.log("The stored value " + storedValue)

    const initial = storedValue ? storedValue : "null";

    console.log("in hook: The initial value " + initial)

    const [token, setToken] = useState(initial);
  
    useEffect(() => {
        if (isLocalStorageAvailable) {
            localStorage.setItem('token', token);
        }
    }, [token, isLocalStorageAvailable]);
  
    function setStoredValue(newValue:string) {
        console.log("in hook: The newValue is ", newValue)
        setToken(newValue);
        if (isLocalStorageAvailable) {
            localStorage.setItem('token', newValue);
        }
        console.log("in hook: The token was set to ", token)
    }
    return [token, setStoredValue];
  }
  
  