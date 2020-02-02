import React from "react";
import { render } from "@testing-library/react";

import App from "./App";
import { useStateValue } from "./store/store.js";
jest.mock("./store/store.js");

describe("App component", () => {
  useStateValue.mockReturnValue([
    {
      appId: "mockAppId",
      basePath: "/",
      dictionaryName: "NCI Dictionary of Cancer Terms"
    }
  ]);

  it("renders an h1 element", () => {
    const { getByText } = render(<App />);
    const headingElement = getByText(/NCI Dictionary of Cancer Terms/i);
    expect(headingElement).toBeInTheDocument();
  });

  /*it("renders a form element with aria-label", () => {
    const { getByLabelText } = render(<App />);
    const formElement = getByLabelText(/Search the Dictionary of Mock Terms/i);
    expect(formElement).toBeInTheDocument();
  });*/
});
