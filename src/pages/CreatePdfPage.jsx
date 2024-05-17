import React, { useState } from "react";
import PDFViewer from "./PdfViewer";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

const CreatePdfPage = () => {
  const [url, setUrl] = useState(null);

  async function createPDF() {
    const apiUrl =
      "http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4";
    const data = {
      text: "Universe",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "output.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setUrl(blobUrl);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div>
      <h1>Create Pdf Page</h1>
      <PDFViewer pdfURL={url} />
      <button onClick={createPDF}>Create PDF</button>
    </div>
  );
};

export default CreatePdfPage;
