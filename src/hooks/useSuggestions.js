import { useState } from 'react';
import {availableCountries} from "../availableCountries";
;

const extractCountries = availableCountries.map(country => country.country);

export default (defaultSuggestions = [], inputVal = '', countries = extractCountries()) => {
	const [suggestions, setSuggestions] = useState(defaultSuggestions);
	const updateSuggestions = (evt) => {
		let suggestions = [];
		if (evt.target.value.length > 0) {
			suggestions = countries.filter(country => country.toLowerCase().includes(evt.target.value.toLowerCase()));
		}
		setSuggestions(suggestions);
	};
	return [suggestions, setSuggestions, updateSuggestions];
};