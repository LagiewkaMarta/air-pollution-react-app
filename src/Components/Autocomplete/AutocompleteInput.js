import React from 'react';
import useInputState from '../../hooks/useInputState';
import useSuggestions from '../../hooks/useSuggestions';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors, setFlex } from '../../styledComponents/styles.helpers';

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
		setInputValue('');
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
				<ul className="killme">
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
		<Autocomplete className="Autocomplete">
			<form
				onSubmit={e => {
					handleFetch(e);
					setIsShowingSuggestions(false);
				}}
				className="Autocomplete-form"
			>
				<div className="Autocomplete-search-container">
					<input
						type="text"
						onChange={updateInputValue}
						onFocus={() => setIsShowingSuggestions(true)}
						placeholder="Enter country name"
						value={InputValue}
						className="Autocomplete-input"
					/>
					<button type="submit" className="Autocomplete-btn">
						search
					</button>
				</div>
				{renderSuggestions()}
			</form>
		</Autocomplete>
	);
}

const Autocomplete = styled.div`
	background-color: red;
	margin-top: 20vh;
	${setFlex()};
	height: 200px;
	position: relative;
	.Autocomplete-form {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 14px;
		height: 100px;
		.Autocomplete-search-container {
			height: 50%;
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
				font-family: 'Helvetica', 'Arial', sans-serif;
			}
		}

		.killme {
			list-style: none;
			background-color: white;
			width: 25vw;
			min-height: 20px;
			li {
				height: 3vh;
				line-height: 3vh;
				cursor: pointer;
				&:hover {
					color: red;
				}
			}
		}
	}
`;
