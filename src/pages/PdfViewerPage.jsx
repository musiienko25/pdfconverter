import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfURL }) => {
  return (
    <div>
      {pdfURL ? (
        <Document file={pdfURL}>
          <Page pageNumber={1} />
        </Document>
      ) : (
        <p>No PDF file selected</p>
      )}
    </div>
  );
};

export default PDFViewer;
