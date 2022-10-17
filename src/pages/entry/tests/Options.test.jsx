import { render, screen } from "@testing-library/react";

import Options from "../Options";

describe("Options component", () => {
    it("displays image for each scoop from server", () => {
        render(<Options optionType="scoops" />);

        // find images
        const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
    });
});
