import React, { useState, useEffect } from "react";
import PDFViewer from "./PdfViewerPage";
import Input from "../components/Input";
import localforage from "localforage";

const CreatePdfPage = () => {
  const [url, setUrl] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState(() => {
    const savedHistory = JSON.parse(localStorage.getItem("pdfHistory")) || [];
    return savedHistory;
  });

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("pdfHistory")) || [];
    setHistory(savedHistory);

    if (savedHistory.length > 0) {
      loadBlob(savedHistory[savedHistory.length - 1].name);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pdfHistory", JSON.stringify(history));
  }, [history]);

  const loadBlob = async (fileName) => {
    const blob = await localforage.getItem(fileName);
    if (blob) {
      const blobUrl = URL.createObjectURL(blob);
      setUrl(blobUrl);
    }
  };

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
      if (blob.type !== "application/pdf") {
        throw new Error("Invalid PDF structure");
      }

      const fileName = `output_${Date.now()}.pdf`;
      await localforage.setItem(fileName, blob);

      const blobUrl = URL.createObjectURL(blob);
      const newHistoryItem = { name: fileName, url: blobUrl };
      setHistory([...history, newHistoryItem]);
      setUrl(blobUrl);

      setInputValue("");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleHistoryItemClick = (clickedItem) => {
    loadBlob(clickedItem.name);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        Create Pdf
      </h1>
      <div className="mt-4 text-center">
        <Input
          value={inputValue}
          onChange={handleChange}
          className="border rounded py-2 px-4 w-full"
        />
        <button
          onClick={createPDF}
          className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Convert to PDF
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-700">
          Conversion History
        </h2>
        <ul className="list-disc list-inside mt-2">
          {history.map((item, index) => (
            <li
              key={index}
              onClick={() => handleHistoryItemClick(item)}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <PDFViewer pdfURL={url || "No PDF file selected"} />
    </div>
  );
};

export default CreatePdfPage;
