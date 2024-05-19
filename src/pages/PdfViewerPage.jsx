import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ pdfURL }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    setError(error.message);
  };

  return (
    <div className="pdf-viewer p-4 border rounded-lg shadow-md">
      {pdfURL ? (
        <Document
          file={pdfURL}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="mx-auto"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} className="my-2 mx-auto" />
          ))}
        </Document>
      ) : (
        <p className="text-gray-500">No PDF file selected</p>
      )}
      {error && <p className="text-red-500">Error loading PDF: {error}</p>}
    </div>
  );
};

export default PDFViewer;
