import { render, screen } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { rest } from "msw";

import OrderConfirmation from "../OrderConfirmation";

it("error response from server for submitting order", async () => {
    // override default msw response for options with error messages
    server.resetHandlers(
        rest.post("http://localhost:3030/order", (req, res, ctx) =>
            res(ctx.status(500))
        )
    );

    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(
        "An unexpected error occurred. Please try again later."
    );
});

it("Check that 'Loading' is shown intitally and then replaced after async action", async () => {
    render(<OrderConfirmation setOrderPhase={jest.fn()} />);

    // Check for elements that rendered immediately
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();

    // Use the state-changes of the component's internal async call, to avoid the "not wrapped in act(...)" warning
    const orderNumber = await screen.findByText(/123455676/);
    expect(orderNumber).toBeInTheDocument();
    expect(loadingText).not.toBeInTheDocument();
});
