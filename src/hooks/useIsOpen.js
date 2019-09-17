import { useState } from "react";

export default (defaultOpenCity = null) => {
    const [currentOpen, setCurrentOpen] = useState(defaultOpenCity);

    const checkIsOpen = (id) => {
        return currentOpen === id;
    }
    const closeIsOpen = (id) => {
        if(currentOpen === id) {
            setCurrentOpen(null);
        }
    }
    return [setCurrentOpen, checkIsOpen, closeIsOpen];
}

