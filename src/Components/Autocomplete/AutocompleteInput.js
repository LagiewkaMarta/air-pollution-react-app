import React from 'react';
import useInputState from '../../hooks/useInputState';
import useSuggestions from '../../hooks/useSuggestions';
import { useEffect, useState } from 'react';

export default function AutocompleteInput({ availableCountries, fetchPollutionData }) {
	const [InputValue, setInputValue, updateInputValue] = useInputState('', 'inputValCity');
	const [suggestions, setSuggestions, updateSuggestions] = useSuggestions([], InputValue, availableCountries);
	const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

	useEffect(() => {
		updateSuggestions(InputValue);
	}, [InputValue]);

	const selectSuggestion = suggestion => {
        setInputValue(suggestion.country);
		setSuggestions([]);
		setIsShowingSuggestions(false);
	};

	const convertCountryToCode = InputValue => {
		const country = availableCountries.find(el => el.country.toLowerCase() === InputValue.toLowerCase());
		if (country) return country.code;
		return null;
	};

	const handleFetch = (e = null, el) => {
		if (e) {
			e.preventDefault();
			fetchPollutionData(convertCountryToCode(InputValue));
		} else {
			fetchPollutionData(el.code);
		}
	};
	const renderSuggestions = () => {
		if (suggestions.length !== 0 && isShowingSuggestions) {
			return (
				<ul>
					{suggestions.map((el, idx) => (
						<li
							onClick={() => {
								selectSuggestion(el);
								handleFetch(null, el);
							}}
							key={idx}
						>
							{el.country}
						</li>
					))}
				</ul>
			);
		}
		return null;
	};

	return (
		<div className="Autocomplete">
			<form
				onSubmit={e => {
					handleFetch(e);
					setIsShowingSuggestions(false);
				}}
			>
				<li
					type="text"
					onChange={updateInputValue}
					onFocus={() => setIsShowingSuggestions(true)}
					placeholder="Enter country name"
				/>
				<button type="submit">search</button>
				{renderSuggestions()}
			</form>
		</div>
	);
}
