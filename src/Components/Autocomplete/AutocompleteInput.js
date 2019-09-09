import React from 'react';
import useInputState from '../../hooks/useInputState';

export default function AutocompleteInput() {
	const [AutocompleteInpuValue, updateAutocompleteInputValue, resetAutocompleteInputValue] = useInputState('');
	return (
		<div className="Autocomplete">
			<form onSubmit={resetAutocompleteInputValue}>
				<input type="text" value={AutocompleteInpuValue} onChange={updateAutocompleteInputValue} />
				<button sype="submit">search</button>
			</form>
		</div>
	);
}
