import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../constants/utilities";

const OrderSummary = () => {
    const { totals, optionCounts } = useOrderDetails();
    // Convert an Object to an array by extracting all the key-value pairs into a new Array that contains tuples of [key, value]
    const scoopArray = Object.entries(optionCounts.scoops); // [["chocolate", 2], ["vanilla", 1]]
    const scoopList = scoopArray.map(([key, value]) => (
        <li key={key}>
            {value} {key}
        </li>
    ));

    // Convert an Object to an array by extracting all the keys into a new Array
    const toppingArray = Object.keys(optionCounts.toppingd); // ["M&Ms", "Gummi bears"]
    const toppingList = toppingArray.map((key) => <li key={key}>{key}</li>);

    return (
        <div>
            <h1>Order Summary</h1>
            <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
            <ul>{scoopList}</ul>
            <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
            {toppingList}
            <SummaryForm />
        </div>
    );
};

export default OrderSummary;
