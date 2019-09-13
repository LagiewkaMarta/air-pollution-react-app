import React, { useState, useEffect } from 'react';
import useIsOpen from '../../hooks/useIsOpen';
import styled from 'styled-components';

export default function City({ city }) {
	let [info, setInfo] = useState(null);
	let [isOpen, toggleIsOpen] = useIsOpen(false);

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

	const show = isOpen ? 'block' : 'none';

	return (
		<CityWrapper>
			<p onClick={toggleIsOpen} className="City-title">
				<span className="CityName">{city.city}</span>{' '}
				<span className="CityMesurements">
					{city.measurements[0].value} {city.measurements[0].parameter}
				</span>{' '}
				<span className="show">{isOpen ? 'show less' : 'show more'}</span>
			</p>
			<div className="City-info" style={{ margin: '30px', display: `${show}` }}>{info}</div>
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
	.show{
		background-color: #eee;
		margin-left: auto;
		padding: 5px;
		color: black;
		transition: all .6s;
		border-radius: 5px;
		&:hover {
			background-color: #8C0321;
		}
	}
	.CityName {
		margin-right: 10px;

	}
	.CityMesurements {
		margin-right: 50px;
	}
`;
