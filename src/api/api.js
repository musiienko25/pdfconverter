import localforage from "localforage";

export async function createPDFRequest(inputValue) {
  const apiUrl = `http://95.217.134.12:4010/create-pdf?apiKey=${process.env.REACT_APP_API_KEY}`;
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

    return fileName;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
