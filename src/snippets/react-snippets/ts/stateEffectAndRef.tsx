import { useState, useEffect, useRef } from "react";

const Unique = () => {
    const [inputValue, setInputValue] = useState<number>("");
    const count = useRef<number>(0);

    useEffect(() => {
        count.current = count.current + 1;
    }, [inputValue]);

    return (
        <>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <h1>Render Count: {count.current}</h1>
        </>
    );
}

export default Unique;