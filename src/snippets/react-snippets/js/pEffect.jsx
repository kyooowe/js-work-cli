import { useEffect } from "react";

const Unique = () => {

    useEffect(() => {
        alert("Im here!");
    }, []);

    return <h1>Unique</h1>
};

export default Unique;
