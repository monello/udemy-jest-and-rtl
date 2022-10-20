import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotalwhen scoops change", async () => {
    const user = userEvent.setup();

    render(<Options optionType="scoops" />);

    // make sure total starts at $0.00
    // - getByText() looks for an exact match by default, but you can set exact to false to get a partiel match
    const scoopsSubtotal = screen.getByText("Scoops total: $", {
        exact: false,
    });
    expect(scoopsSubtotal).toHaveTextContent("0.00");

    // update vanilla scoops to 1 and check the subtotal
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
    });
    // Rememeber: Every event on the user-object returns a Promise, so they all need to be await'ed
    // https://testing-library.com/docs/user-event/intro
    // https://testing-library.com/docs/user-event/utility#clear
    // clear(), clears an editable element
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(scoopsSubtotal).toHaveTextContent("2.00");

    // update the chocolate scoops to 2 and check the subtotal
    const chocolatInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
    });
    await user.clear(chocolatInput);
    await user.type(chocolatInput, "2");
    expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
    const user = userEvent.setup();
    render(<Options optionType="toppings" />);

    // make sure total starts out at $0.00
    const toppingsTotal = screen.getByText("Toppings total: $", {
        exact: false,
    });
    expect(toppingsTotal).toHaveTextContent("0.00");

    // add cherries and check subtotal
    const cherriesCheckbox = await screen.findByRole("checkbox", {
        name: "Cherries",
    });
    await user.click(cherriesCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");

    // add hot fudge and check subtotal
    const hotFudgeCheckbox = screen.getByRole("checkbox", {
        name: "Hot Fudge",
    });
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("3.00");

    // remove hot fudge and check subtotal
    await user.click(hotFudgeCheckbox);
    expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
    test("grand total starts at $0.00", () => {
        // Test that the total starts out at $0.00
        render(<OrderEntry />);
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/,
        });
        expect(grandTotal).toHaveTextContent("0.00");
    });

    test("grand total updates properly if scoop is added first", async () => {
        const user = userEvent.setup();

        // Test that the total starts out at $0.00
        render(<OrderEntry />);
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/,
        });
        expect(grandTotal).toHaveTextContent("0.00");

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent("4.00");

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if topping is added first", async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/,
        });

        // add cherries and check grand total
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("1.50");

        // update vanilla scoops to 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
        expect(grandTotal).toHaveTextContent("5.50");
    });

    test("grand total updates properly if item is removed", async () => {
        const user = userEvent.setup();
        render(<OrderEntry />);

        // add cherries
        const cherriesCheckbox = await screen.findByRole("checkbox", {
            name: "Cherries",
        });
        await user.click(cherriesCheckbox);
        // grand total $1.50

        // update vanilla scoops to 2; grand total should be $5.50
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");

        // remove 1 scoop of vanilla and check grand total
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "1");

        // check grand total
        const grandTotal = screen.getByRole("heading", {
            name: /Grand total: \$/,
        });
        expect(grandTotal).toHaveTextContent("3.50");

        // remove cherries and check grand total
        await user.click(cherriesCheckbox);
        expect(grandTotal).toHaveTextContent("2.00");
    });
});
