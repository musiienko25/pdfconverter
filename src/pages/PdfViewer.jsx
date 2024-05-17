import React from "react";
import { Document, Page } from "react-pdf";
const PDFViewer = () => {
  const pdfURL = "path_to_pdf_file.pdf";
  return (
    <div>
      <Document file={pdfURL}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
export default PDFViewer;
