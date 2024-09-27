"use client";
import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import SelectableText from "./components/selectableText/SelectableText";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PDFUploader() {
  const [pdfText, setPdfText] = useState<string>("");

  const handlePDFUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;
        let extractedText = "";
        for (let pageIterator = 1; pageIterator <= pdf.numPages; pageIterator++) {
          const page = await pdf.getPage(pageIterator);
          const textContent = await page.getTextContent();
          extractedText += `\n\nPage ${pageIterator}:\n`;
          textContent.items.forEach((item) => {
            extractedText += (item as any).str + " ";
          });
        }
        setPdfText(extractedText.trim());
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="bg-black text-white p-5 min-h-screen">
      <input
        type="file"
        accept="application/pdf"
        onChange={handlePDFUpload}
        className="bg-gray-700 text-white py-2 px-4 rounded mt-5 mb-5"
      />
      <div className="px-10 py-10">
        {pdfText && <SelectableText text={pdfText} />}
      </div>
    </div>
  );
}
