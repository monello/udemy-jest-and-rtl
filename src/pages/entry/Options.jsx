import { useEffect, useState } from "react";
import axios from "axios";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";

const Options = ({ optionType }) => {
    const [items, setItems] = useState([]);

    // optionType is 'scoops' or 'toppings'
    useEffect(() => {
        axios
            .get(`http://localhost:3030/${optionType}`)
            .then((response) => setItems(response.data))
            .catch((error) => {
                // TODO: handle error response
            });
    }, [optionType]);

    // TODO: replace 'null' woth ToppingOption once it is available
    const ItemComponent = optionType === "scoops" ? ScoopOption : null;

    const optionItems = items.map((item) => (
        <ItemComponent
            key={item.name}
            name={item.name}
            imagePath={item.imagePath}
        />
    ));

    return <Row>{optionItems}</Row>;
};

export default Options;
