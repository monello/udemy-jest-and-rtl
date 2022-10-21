import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";

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
