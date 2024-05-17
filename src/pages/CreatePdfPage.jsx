import React, { useState, useEffect } from "react";
import PDFViewer from "./PdfViewerPage";
import Input from "../components/Input";

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
      setUrl(savedHistory[savedHistory.length - 1].url);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pdfHistory", JSON.stringify(history));
  }, [history]);

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
      const blobUrl = URL.createObjectURL(blob); // Створення URL з об'єкта blob
      const fileName = `output_${Date.now()}.pdf`; // Генерація імені файлу

      // window.open(blobUrl, "_blank");

      const newHistoryItem = { name: fileName, url: blobUrl, blob: blob }; // Додали blob до історії
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
    setUrl(clickedItem.url); // Зміна URL при кліку на елемент історії
  };

  return (
    <div>
      <h1>Create Pdf Page</h1>
      <Input value={inputValue} onChange={handleChange} />
      <button onClick={createPDF}>Convert to PDF</button>

      <div>
        <h2>Conversion History</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index} onClick={() => handleHistoryItemClick(item)}>
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
