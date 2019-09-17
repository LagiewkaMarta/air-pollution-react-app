import React from 'react';
import styled from 'styled-components';
//hooks
import useSuggestions from '../../hooks/useSuggestions';
//data
import { availableCountries } from '../../availableCountries';
//style helpers
import { setFlex, colors } from '../../GlobalStyles/styles.helpers';

const countryList = availableCountries.map(country => country.country);

export default function AutocompleteInput({ inputValue, handleInputChange, triggerSearch, setSearch, setInputValue }) {
	const [suggestions, setSuggestions, updateSuggestions] = useSuggestions([], countryList);

	const onKeyDown = evt => {
		if (evt.key === 'Enter' && suggestions.length !== 0) {
			setInputValue(suggestions[0]);
			setSearch(suggestions[0]);
			setSuggestions([]);
		}
	};

	return (
		<Autocomplete>
			<div className="container">
				<input
					onFocus={evt => {
						if (inputValue === '') {
							setSuggestions(countryList);
						} else {
							updateSuggestions(evt);
						}
					}}
					onKeyDown={onKeyDown}
					type="text"
					value={inputValue}
					onChange={evt => {
						handleInputChange(evt);
						updateSuggestions(evt);
					}}
					className="Autocomplete-input"
				></input>
				<button
					type="button"
					onClick={() => {
						triggerSearch(inputValue);
						setSuggestions([]);
					}}
					className="Autocomplete-btn"
				>
					Search
				</button>
				{suggestions &&
					suggestions.map((suggestion, id) => (
						<p
							key={id}
							onClick={() => {
								setSuggestions([]);
								setSearch(suggestion);
								setInputValue(suggestion);
							}}
							className="City"
						>
							{suggestion}
						</p>
					))}
			</div>
		</Autocomplete>
	);
}

const Autocomplete = styled.div`
	width: 60%;
	margin: 10vh auto;
	height: 200px;
	background-color: ${colors.autocompleteBgColor};
	${setFlex()}

	.container {
		width: 70%;
		height: 55%;
		.Autocomplete-input {
			margin-right: 20px;
			height: 4vh;
			width: 25vw;
			min-width: 140px;
		}
		.Autocomplete-btn {
			padding: 14px 20px;
			border-radius: 5px;
			text-transform: uppercase;
			font-weight: bold;
			background-color: ${colors.cityWrapperColor};
			color: white;
			transition: all 0.6s;
			&:hover {
				background-color: white;
				color: ${colors.cityWrapperColor};
			}
		}
	}

	.City {
		background-color: white;
		width: 25vw;
		min-height: 20px;
		height: 3vh;
		line-height: 3vh;
		color: rgb(150, 150, 150);
		text-transform: uppercase;
		cursor: pointer;
		&:hover {
			color: rgb(0, 0, 0);
		}
	}
	@media (max-width: 640px) {
		width: 90%;
	}
`;
