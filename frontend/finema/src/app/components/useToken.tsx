import {useState, useEffect} from "react";

export function useToken(initialValue:any) {
    const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    //console.log("The true intital value " + initialValue)

    const storedValue = isLocalStorageAvailable ? localStorage.getItem('token') : null;

    //console.log("The stored value " + storedValue)

    const initial = storedValue ? storedValue : initialValue;

    //console.log("The initial value " + initial)

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

    // const setStoredValue = (newValue:string) => {
    //     setToken(newValue);
    //     if (isLocalStorageAvailable) {
    //         localStorage.setItem('token', newValue);
    //     }
    // };
  
    return [token, setStoredValue];
  }
  
  