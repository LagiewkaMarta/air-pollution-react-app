import React from 'react';
import AutocompleteInput from './Components/Autocomplete/AutocompleteInput';
import City from './Components/City/City';
import GlobalStyles from './GlobalStyles/GlobalStyles';
import { HeadingPrimary, HeadingSecondary } from './Components/Headings/Headings';
import { useState } from 'react';
import { availableCountries } from './availableCountries';
import styled from 'styled-components';
import bg from './bg.svg';

function App() {
	const [isFetching, setIsFetching] = useState(false);
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	const fetchPollutionData = Countrycode => {
		setIsFetching(true);
		async function foo() {
			const url = `https://api.openaq.org/v1/latest?country=${Countrycode}&parameter=pm25&order_by=measurements[0].value&limit=10&sort=desc`;
			try {
				let res = await fetch(url);
				res = await res.json();
				res = res.results;
				setData(res);
				setIsFetching(false);
			} catch (error) {
				setIsFetching(false);
				setError(true);
			}
		}
		foo();
	};
	return (
		<>
			<GlobalStyles />
			<AppWrapper>
				<HeadingPrimary>air pollution app</HeadingPrimary>
				<HeadingSecondary>
					Poland <span role="img" aria-label="Polish flag">🇵🇱</span> Spain <span aria-label="Spanish flag" role="img">🇪🇸</span> France <span aria-label="French flag" role="img">🇫🇷</span>Germany <span role="img" aria-label="German flag">🇩🇪</span>{' '}
				</HeadingSecondary>
				<AutocompleteInput availableCountries={availableCountries} fetchPollutionData={fetchPollutionData} />
				{isFetching && <Info>Fetching data...</Info>}
				{!isFetching && data && data.map((city, i) => <City key={i} city={city}></City>)}
				{error && <Info>error</Info>}
				{!isFetching && data && data.length === 0 && <Info>no data available</Info>}
				        
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
