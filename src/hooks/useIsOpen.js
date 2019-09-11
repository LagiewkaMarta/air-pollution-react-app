import { useState } from "react";

export default (open = false) => {
    const [isOpen, setIsOpen] = useState(open);
    const toggle = () => {
        setIsOpen(!isOpen);
    }
    return [isOpen, toggle];
}