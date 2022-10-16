import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
    it("initial state is rendered correctly", () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole("checkbox", {
            name: /terms and conditions/i,
        });
        expect(checkbox).not.toBeChecked();

        const button = screen.getByRole("button", { name: /confirm order/i });
        expect(button).toBeDisabled();
    });

    it('the checkbox toggles the button status when clicked', async () => {
        // create a user-instance
        const user = userEvent.setup();

        render(<SummaryForm />);
        const checkbox = screen.getByRole("checkbox", {
            name: /terms and conditions/i,
        });
        const button = screen.getByRole("button", { name: /confirm order/i });

        // click the checkbox
        await user.click(checkbox);
        expect(button).toBeEnabled();
        expect(checkbox).toBeChecked();

        // click the checkbox again
        await user.click(checkbox);
        expect(button).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    it("popover responds to hover", async () => {
        // create a user-instance
        const user = userEvent.setup();
        render(<SummaryForm />);

        // popover start out hidden
        // - we use queryBy... because we are expecting the element to not be in the DOM and we don't want the
        //      test to error-out on this line as it would for getBy... and findBy...
        const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
        // - here we assert that it is indeed null (Not in the document)
        expect(nullPopover).toBeNull();
        // - could also use...
        expect(nullPopover).not.toBeInTheDocument(); // Does the same as the previous assert, but apparently the preferred wey yo assert this

        // popover appears when we mouse-over (hover over) the checkbox
        const terms = screen.getByText(/terms and conditions/i);
        await user.hover(terms);
        const popover = screen.getByText(/no ice cream will actually be delivered/i);
        expect(popover).toBeInTheDocument();

        // popover dissapears again when we mouse-out
        await user.unhover(terms);
        expect(popover).not.toBeInTheDocument();
    });
});
