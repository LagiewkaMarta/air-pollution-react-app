import { useState } from 'react';

export default (inputVal = '') => {
	const [inputValue, setInputValue] = useState(inputVal);

	const handleInputChange = e => {
		setInputValue(e.target.value);
	};
	const reset = (e) => {
        e.preventDefault();
		setInputValue('');
	};
	return [inputValue, handleInputChange, reset];
};
