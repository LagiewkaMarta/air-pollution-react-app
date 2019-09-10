import React from 'react';
import AutocompleteInput from './Components/Autocomplete/AutocompleteInput';
import { availableCountries } from './availableCountries';

function App() {
	return (
		<div className="App">
			<AutocompleteInput availableCountries={availableCountries} />
		</div>
	);
}

export default App;
