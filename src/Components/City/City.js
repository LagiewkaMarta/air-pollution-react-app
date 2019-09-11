import React, { useState, useEffect } from 'react';
import useIsOpen from "../../hooks/useIsOpen";

export default function City({city}) {
    let [ info, setInfo ] = useState(null);
    let [isOpen, toggleIsOpen] = useIsOpen(false);

    useEffect(()=> {
        async function foo() {
            const url = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&origin=*&titles=${city.city}`;
			try {
                let res = await fetch(url);
				res = await res.json();
                const id = Object.keys(res.query.pages)
                setInfo(res.query.pages[id[0]].extract)
			} catch (error) {
			}
		}
		foo();
    }, [city.city])
    const show = isOpen ? "block" : "none";
    return (
        <div>
           <p onClick={toggleIsOpen}>{city.city} {city.measurements[0].value}</p>
           <div style={{margin: "30px", display: `${show}`}}>{info}</div>
        </div>
    )
}
