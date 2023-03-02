import { useState } from "react";

const button = () => {
    const [counter, setCounter] = useState(0);

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </>
    );
};

export default button;
