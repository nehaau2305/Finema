import {useState, useEffect} from "react";

export function useToken() {
    //const isLocalStorageAvailable = typeof window !== "undefined" && window.localStorage;

    let storedValue = localStorage.getItem('token');
    if (storedValue == null) {
        storedValue = '';
    }

    //const initial = storedValue ? storedValue : initialValue;

    console.log("in hook: The retrieved stored value is " + storedValue)

    const [token, setToken] = useState(storedValue);
  
    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);
  
    function setStoredValue(newValue:string) {
        setToken(newValue);
        localStorage.setItem('token', newValue);
    }

    // const setStoredValue = (newValue:string) => {
    //     setToken(newValue);
    //     if (isLocalStorageAvailable) {
    //         localStorage.setItem('token', newValue);
    //     }
    // };
  
    return [token, setStoredValue];
  }
  
  