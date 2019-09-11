import { useState } from 'react';

export default (defaultSuggestions = [], inputVal = '', countries) => {
	const [suggestions, setSuggestions] = useState(defaultSuggestions);
	const updateSuggestions = () => {
		let suggestions = [];
		if (inputVal.length > 0) {
			suggestions = countries.filter(country => country.country.toLowerCase().includes(inputVal.toLowerCase()));
		}
		setSuggestions(suggestions);
	};
	return [suggestions, setSuggestions, updateSuggestions];
};
