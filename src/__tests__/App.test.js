import React from "react";

import App from "../App";
import { render } from '../utilities/testing-library';

describe("App component", () => {

  it("should render DisplayGlossary component as default", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('display-glossary')).toBeDefined();
  });
});
