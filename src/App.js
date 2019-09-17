import React from 'react';
import AutocompleteInput from './Components/Autocomplete/AutocompleteInput';
import City from './Components/City/City';
import GlobalStyles from './GlobalStyles/GlobalStyles';
import { HeadingPrimary, HeadingSecondary } from './Components/Headings/Headings';
import { availableCountries } from './availableCountries';
import styled from 'styled-components';
import bg from './bg.svg';
//hooks
import { useState, useEffect } from 'react';
import useInputState from './hooks/useInputState';
import useIsOpen from './hooks/useIsOpen';


function App() {
	const [data, setData] = useState(null);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [inputValue, setInputValue, handleInputChange] = useInputState('', 'inputVal');
	const [setCurrentOpen, checkIsOpen, closeIsOpen] = useIsOpen(null);

	const convertCountryToCode = val => {
		const country = availableCountries.find(el => el.country.toLowerCase() === val.toLowerCase());
		if (country) return country.code;
		return null;
	};
	const removeDuplicates = data => {
		let newData = [...(new Set(data.map(el => el.city)))]
		.map(cityName => {
		  return data.find(el => el.city === cityName)
		});
		newData = newData.slice(0,10)
		return newData
	};

	useEffect(() => {
		const fetchData = async () => {
			if (search !== '') {
				setIsLoading(true);
				try {
					const countryCode = convertCountryToCode(search);
					const url = `https://api.openaq.org/v1/measurements?country=${countryCode}&parameter=pm25&order_by=value&sort=desc&limit=200`;
					let result = await fetch(url);
					result = await result.json();
					let cities = removeDuplicates(result.results);
					setData(cities);
					setIsLoading(false);
				} catch (e) {
					setIsError(true);
					setIsLoading(false);
					throw new Error(e);
				}
			}
		};
		fetchData();
	}, [search]);

	const triggerSearch = () => {
		setSearch(inputValue);
	};

	return (
		<>
			<GlobalStyles />
			<AppWrapper>
				<HeadingPrimary>air pollution app</HeadingPrimary>
				<HeadingSecondary>
					Poland{' '}
					<span role="img" aria-label="Polish flag">
						🇵🇱
					</span>{' '}
					Spain{' '}
					<span aria-label="Spanish flag" role="img">
						🇪🇸
					</span>{' '}
					France{' '}
					<span aria-label="French flag" role="img">
						🇫🇷
					</span>
					Germany{' '}
					<span role="img" aria-label="German flag">
						🇩🇪
					</span>{' '}
				</HeadingSecondary>
				<AutocompleteInput
					availableCountries={availableCountries}
					triggerSearch={triggerSearch}
					inputValue={inputValue}
					handleInputChange={handleInputChange}
					setSearch={setSearch}
					setInputValue={setInputValue}
				/>
				{isLoading && <Info>Fetching data...</Info>}
				{!isLoading &&
					data &&
					data.map((city, i) => (
						<City
							key={i}
							city={city}
							id={i}
							setCurrentOpen={setCurrentOpen}
							checkIsOpen={checkIsOpen}
							closeIsOpen={closeIsOpen}
						></City>
					))}
				{isError && <Info>error</Info>}
				{!isLoading && data && data.length === 0 && <Info>no data available</Info>}
				        
			</AppWrapper>{' '}
		</>
	);
}

const AppWrapper = styled.div`
	min-height: 100vh;
	background-image: url(${bg});
`;

const Info = styled.div`
	min-height: 2vh;
	text-transform: uppercase;
	color: white;
	width: 40vw;
	margin: 0 auto;
	font-size: 30px;
	text-align: center;
	background-color: rgba(255, 255, 255, 0.3);
`;
export default App;
