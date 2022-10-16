import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from '@testing-library/user-event';

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
});
