import React from 'react';
import styled from "styled-components";
import useSuggestions from '../../hooks/useSuggestions';

const countriesList = ['Poland', 'Spain', 'Germany', 'France'];
// const extractCountries = availableCountries.map(country => country.country);

export default function AutocompleteInput({ inputValue, handleInputChange, triggerSearch, setSearch, setInputValue }) {
	const [suggestions, setSuggestions, updateSuggestions] = useSuggestions([], inputValue, countriesList);

	const onKeyDown = (evt) => {
		if(evt.key === "Enter"){
			setInputValue(suggestions[0]);
			setSearch(suggestions[0]);
			setSuggestions([]);
		}
	}

	return (
		<div>
			<input
                onFocus={evt => {
					console.log(inputValue)
					if(inputValue === ""){
						setSuggestions(countriesList)
					} else {
						updateSuggestions(evt)}

					}
				}
				onKeyDown={onKeyDown}
				type="text"
				value={inputValue}
				onChange={evt => {
					handleInputChange(evt);
					updateSuggestions(evt);
				}}
			></input>
			<button
				type="button"
				onClick={() => {
					triggerSearch(inputValue);
					setSuggestions([]);
				}}
			>
				Search
			</button>
			{suggestions &&
				suggestions.map((suggestion, id) => (
					<p
						key={id}
						style={{color:"white"}}
						onClick={() => {
							setSuggestions([]);
							setSearch(suggestion);
							setInputValue(suggestion);
						}}
					>
						{suggestion}
					</p>
				))}
		</div>
	);
}

// const Autocomplete = styled.div`
// 	width: 60%;
// 	margin: 10vh auto;
// 	${setFlex()};
// 	height: 300px;
// 	background-color: rgba(244, 0, 0, 0.57);
// 	position: relative;
// 	.Autocomplete-form {
// 		position: absolute;
// 		top: 50%;
// 		left: 50%;
// 		transform: translate(-50%, -50%);
// 		font-size: 14px;
// 		height: 100px;
// 		width: 90%;
// 		.Autocomplete-search-container {
// 			height: 50%;
// 			.Autocomplete-input {
// 				margin-right: 20px;
// 				height: 4vh;
// 				width: 25vw;
// 				min-width: 140px;
// 			}
// 			.Autocomplete-btn {
// 				padding: 14px 20px;
// 				border-radius: 5px;
// 				text-transform: uppercase;
// 				font-weight: bold;
// 				background-color: #030033;
// 				color: white;
// 				transition: all 0.6s;
// 				&:hover {
// 					background-color: white;
// 					color: #030033;
// 				}
// 			}
// 		}

// 		.CityUl {
// 			list-style: none;
// 			background-color: white;
// 			width: 25vw;
// 			min-height: 20px;
// 			li {
// 				height: 3vh;
// 				line-height: 3vh;
// 				color: rgb(150, 150, 150);
// 				text-transform: uppercase;
// 				cursor: pointer;
// 				&:hover {
// 					color: rgb(0, 0, 0);
// 				}
// 			}
// 		}
// 	}
// `;
