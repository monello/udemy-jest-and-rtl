import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

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
