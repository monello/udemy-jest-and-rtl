import { fireEvent, render, screen } from "@testing-library/react";
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

    it('the checkbox toggles the button status when clicked', () => {
        render(<SummaryForm />);
        const checkbox = screen.getByRole("checkbox", {
            name: /terms and conditions/i,
        });
        const button = screen.getByRole("button", { name: /confirm order/i });

        // click the checkbox
        fireEvent.click(checkbox);
        expect(button).toBeEnabled();
        expect(checkbox).toBeChecked();

        // click the checkbox again
        fireEvent.click(checkbox);
        expect(button).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });
});
