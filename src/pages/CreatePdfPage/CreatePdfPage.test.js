import React from "react";
import { render } from "@testing-library/react";
import CreatePdfPage from "./CreatePdfPage";

jest.mock("../../api/api", () => ({
  createPDFRequest: jest.fn().mockResolvedValue("test.pdf"),
}));

describe("CreatePdfPage", () => {
  it("renders without crashing", () => {
    render(<CreatePdfPage />);
  });

  it('displays "No PDF file selected" if no PDF is generated', () => {
    const { getByText } = render(<CreatePdfPage />);
    expect(getByText("No PDF file selected")).toBeInTheDocument();
  });
});
