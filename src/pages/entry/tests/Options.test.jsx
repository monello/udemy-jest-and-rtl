import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

describe("Options component", () => {
    it("displays image for each scoop from server", async () => {
        render(<Options optionType="scoops" />);

        // find images
        const scoopImages = await screen.findAllByRole("img", {
            name: /scoop$/i,
        });
        expect(scoopImages).toHaveLength(2);

        // confirmm alt test of images
        const altText = scoopImages.map((element) => element.alt);
        expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
    });

    it("displays image for each toppings from server", async () => {
        render(<Options optionType="toppings" />);

        // find images
        const images = await screen.findAllByRole("img", {
            name: /topping$/i,
        });
        expect(images).toHaveLength(3);

        // confirmm alt text of images
        const imageTitles = images.map((img) => img.alt);
        expect(imageTitles).toEqual([
            "Cherries topping",
            "M&Ms topping",
            "Hot Fudge topping",
        ]);
    });

    test("don't update total if scoops input is invalid", async () => {
        const user = userEvent.setup();
        render(<Options optionType="scoops" />);

        // expect button to be enabled after adding scoop
        const vanillaInput = await screen.findByRole("spinbutton", {
            name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "-1");

        // make sure scoops subtotal hasn't updated
        const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
        expect(scoopsSubtotal).toBeInTheDocument();
    });
});
