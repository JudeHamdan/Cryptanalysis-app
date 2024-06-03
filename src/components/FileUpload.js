import React, { useState } from "react";
import EncryptionAlgorithms from "./EncryptionAlgorithms";
import "./FileUpload.css";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);
    };
    reader.readAsText(selectedFile);
  };

  return (
    <div className="file-upload-container">
      <h2>Upload a File</h2>
      <div className="input-group">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      {fileContent && (
        <div>
          <h3>File Content</h3>
          <textarea value={fileContent} readOnly rows="10" cols="50" />
          <EncryptionAlgorithms text={fileContent} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
