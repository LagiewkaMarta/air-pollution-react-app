import {useState} from 'react';
import useLocalStorage from "./useLocalStorageState";

const useInputState = (defaultValue = "" , key) => {
    const [state, setState] = useLocalStorage(key, defaultValue);

    const handleInputChange = (e) => {
        setState(e.target.value)
    }
    return [state, setState, handleInputChange]
}
export default useInputState;