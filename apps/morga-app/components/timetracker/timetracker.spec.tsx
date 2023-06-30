import { render } from "@testing-library/react";

import Timetracker from "./timetracker";

describe("Timetracker", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Timetracker />);
    expect(baseElement).toBeTruthy();
  });
});
