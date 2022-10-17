import { render, screen } from "@testing-library/react";

import Options from "../Options";

describe("Options component", () => {
    it("displays image for each scoop from server", () => {
        render(<Options optionType="scoops" />);

        // find images
        const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
<<<<<<< HEAD
        expect(scoopImages).toHaveLength(2);

        // confirmm alt test of images
        const altText = scoopImages.map((element) => element.alt);
        expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
=======
>>>>>>> 98db2a1c1771dfd80b2e72f609862613787b9584
    });
});
