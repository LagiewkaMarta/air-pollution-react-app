import React from 'react';
import AutocompleteInput from './Components/Autocomplete/AutocompleteInput';
import City from "./Components/City/City";
import GlobalStyles from "./styledComponents/GlobalStyles";
import { useState } from 'react';
import { availableCountries } from './availableCountries';

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
		<GlobalStyles/>
		<div className="App">
			<AutocompleteInput availableCountries={availableCountries} fetchPollutionData={fetchPollutionData}/>
			{isFetching && <p>i'm fetching</p>}
			{!isFetching && data && data.map((city, i) => <City key={i} city={city}></City>)}
            {error && <p>error</p>}
            {!isFetching && data && data.length === 0 && <p>no data available</p>}
			        
		</div> </>
		
	);
}

export default App;
