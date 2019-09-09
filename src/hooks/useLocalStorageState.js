import { useState, useEffect } from 'react';

function useLocalstorageState(defaultVal = '', key) {
	const [state, setState] = useState(() => {
		let val;
		try {
			val = JSON.parse(localStorage.getItem(key)) || defaultVal;
		} catch (e) {
			val = defaultVal;
		}
		return val;
	});

	useEffect(() => {
		window.localStorage.setItem(key, JSON.stringify(state));
	}, [state, key]);

	return [state, setState];
}

export default useLocalstorageState;
