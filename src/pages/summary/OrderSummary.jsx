import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../constants/utilities";

const OrderSummary = ({ setOrderPhase }) => {
    const { totals, optionCounts } = useOrderDetails();
    // Convert an Object to an array by extracting all the key-value pairs into a new Array that contains tuples of [key, value]
    const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    // only display toppings if the toppings total is nonzero
    const hasToppings = totals.toppings > 0;
    let toppingsDisplay = null;

    if (hasToppings) {
        // Convert an Object to an array by extracting all the keys into a new Array
        const toppingsArray = Object.keys(optionCounts.toppings); // ["M&Ms", "Gummi bears"]
        const toppingList = toppingsArray.map((key) => (
            <li key={key}>{key}</li>
        ));
        toppingsDisplay = (
            <>
                <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
                <ul>{toppingList}</ul>
            </>
        );
    }

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            {toppingsDisplay}
            <SummaryForm setOrderPhase={setOrderPhase} />
        </div>
    );
};

export default OrderSummary;
