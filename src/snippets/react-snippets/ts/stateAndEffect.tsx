import { useState, useEffect } from "react";

const Unique = () => {
    const [counter, setCounter] = useState<number>(0);

    useEffect(() => {
        console.log("im working when counter change!");
    }, [counter]);

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </>
    );
};

export default Unique;
