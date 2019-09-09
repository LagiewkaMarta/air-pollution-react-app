import React from 'react';
import useInputState from '../../hooks/useInputState';

export default function AutocompleteInput() {
	const [InputValue, updateInputValue, resetInputValue] = useInputState('', "inputValCity");

	return (
		<div className="Autocomplete">
			<form>
				<input type="text" value={InputValue} onChange={updateInputValue} />
				<button type="submit">search</button>
			</form>
		</div>
	);
}
