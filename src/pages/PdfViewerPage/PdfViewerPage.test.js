import React from "react";
import { render } from "@testing-library/react";
import PDFViewer from "./PdfViewerPage";

describe("PDFViewer", () => {
  it("renders without crashing", () => {
    render(<PDFViewer pdfURL="No PDF file selected" />);
  });

  it("displays 'No PDF file selected' message when pdfURL is 'No PDF file selected'", () => {
    const { getByText } = render(<PDFViewer pdfURL="No PDF file selected" />);
    expect(getByText("PDF не вибрано")).toBeInTheDocument();
  });
});
