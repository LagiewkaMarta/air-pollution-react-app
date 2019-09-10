import useLocalStorageState from './useLocalStorageState';

export default (inputVal = '', key) => {
	const [inputValue, setInputValue] = useLocalStorageState(inputVal, key);

	const handleInputChange = e => {
		setInputValue(e.target.value);
	};
	const reset = e => {
		e.preventDefault();
		setInputValue('');
	};
	return [inputValue, setInputValue, handleInputChange, reset];
};
