import {useState, useEffect} from 'react';

const useLocalStorage = (key, defaultVal) => {
    const [state, setState] = useState(() => {
        let val;
        try {
            val = JSON.parse(localStorage.getItem(key)) || defaultVal;
        } catch (error) {
            val = defaultVal;
        }
        return val;
    })

    useEffect(() => {
       localStorage.setItem(key, JSON.stringify(state));
    }, [state])

    return [state,setState]
}

export default useLocalStorage;