import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewer = ({ pdfURL }) => {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setError(error.message);
  };

  return (
    <div className="pdf-viewer p-4 ">
      {pdfURL !== "No PDF file selected" ? (
        <div style={{ height: "750px" }}>
          <Worker
            workerUrl={`//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js`}
          >
            <Viewer fileUrl={pdfURL} onError={handleError} />
          </Worker>
        </div>
      ) : (
        <p className="text-gray-500">No PDF file selected</p>
      )}
      {error && <p className="text-red-500">Error loading PDF: {error}</p>}
    </div>
  );
};

export default PDFViewer;
