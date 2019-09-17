import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function City({ city, setCurrentOpen, checkIsOpen, closeIsOpen, id }) {
	const [info, setInfo] = useState(null);

	useEffect(() => {
		async function foo() {
			const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${city.city}`;
			let res;
			try {
				res = await fetch(url);
				res = await res.json();
				const id = Object.keys(res.query.pages);
				setInfo(res.query.pages[id[0]].extract);
			} catch (error) {
				throw new Error(error);
			}
		}
		foo();
	}, [city.city]);

	const handleCheckIsOpen = () => {
		return checkIsOpen(id);
	};
	const handleCloseIsOpen = () => {
		closeIsOpen(id);
	};

	const isCityOpen = handleCheckIsOpen();
	const cityDisplay = isCityOpen ? 'block' : 'none';

	return (
		<CityWrapper isCityOpen={isCityOpen}>
			<p
				onClick={() => {
					setCurrentOpen(id);
					handleCloseIsOpen();
				}}
				className="City-title"
			>
				<span className="CityName">{city.city}</span>{' '}
				<span className="CityMesurements">
					{city.value} {city.parameter}
				</span>{' '}
				<span className="show">{isCityOpen ? 'show less' : 'show more'}</span>
			</p>
			<div className="City-info" style={{ margin: '30px', display: `${cityDisplay}`}}>
				{info}
			</div>
		</CityWrapper>
	);
}

const CityWrapper = styled.div`
	background-color: #030033;
	color: white;
	width: 80%;
	margin: 0 auto;
	min-height: 5vh;
	padding: 5px 15px;
	text-transform: uppercase;
	.City-title {
		display: flex;
		align-items: center;
		background-color: #030033;
		min-height: 5vh;
	}
	.City-info {
	}
	.show {
		background-color: #eee;
		margin-left: auto;
		padding: 5px;
		color: black;
		transition: all 0.6s;
		border-radius: 5px;
		/* background-color: ${ ({isCityOpen}) =>  isCityOpen ? "green" :"red"}; */
		&:hover {
			background-color: #8c0321;
		}
	}
	.CityName {
		margin-right: 10px;
	}
	.CityMesurements {
		margin-right: 50px;
	}
`;
