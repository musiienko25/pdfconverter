import React, { useState } from "react";
import PDFViewer from "./PdfViewerPage";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Input from "../components/Input";

const CreatePdfPage = () => {
  const [url, setUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");

  async function createPDF() {
    const apiUrl =
      "http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4";
    const data = {
      text: inputValue,
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

      window.open(blobUrl, "_blank");

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

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h1>Create Pdf Page</h1>
      <Input value={inputValue} onChange={handleChange} />
      <PDFViewer pdfURL={url} />
      <button onClick={createPDF}>Create PDF</button>
    </div>
  );
};

export default CreatePdfPage;
