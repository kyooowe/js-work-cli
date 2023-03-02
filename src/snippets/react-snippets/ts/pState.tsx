import { useState } from "react";

const Unique = () => {
    const [counter, setCounter] = useState<number>(0);

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Click me</button>
        </>
    );
};

export default Unique;
