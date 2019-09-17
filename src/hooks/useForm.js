import {useState} from 'react';

const useForm = (defaultVal) => {
    const [state, setState] = useState(defaultVal);

    const updateValue = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }
    return [state, updateValue];
}
export default useForm;