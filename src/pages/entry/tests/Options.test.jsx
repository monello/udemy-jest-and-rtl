import { render, screen } from "@testing-library/react";

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
});
