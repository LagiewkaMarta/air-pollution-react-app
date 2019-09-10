import React from 'react';
import useInputState from '../../hooks/useInputState';
import useSuggestions from '../../hooks/useSuggestions';
import { useEffect, useState } from 'react';

export default function AutocompleteInput({ availableCountries }) {
	const [InputValue, setInputValue, updateInputValue] = useInputState('', 'inputValCity');
	const [suggestions, setSuggestions, updateSuggestions] = useSuggestions([], InputValue, availableCountries);
	const [isShowingSuggestions, setIsShowingSuggestions] = useState(false);

	useEffect(() => {
		updateSuggestions(InputValue);
	}, [InputValue]);

	const selectSuggestion = suggestion => {
		setInputValue(suggestion);
		setSuggestions([]);
		setIsShowingSuggestions(false);
	};

	const renderSuggestions = () => {
		if (suggestions.length !== 0 && isShowingSuggestions) {
			return (
				<ul>
					{suggestions.map((el, idx) => (
						<li onClick={() => selectSuggestion(el)} key={idx}>
							{' '}
							{el}
						</li>
					))}
				</ul>
			);
		}
		return null;
	};

	return (
		<div className="Autocomplete">
			<form>
				<input
					type="text"
					value={InputValue}
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
