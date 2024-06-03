import React, { useState } from "react";
import RailFenceAnalysis from "./RailFenceAnalysis";

const RailFenceCipher = ({ text }) => {
  const [rails, setRails] = useState(2);
  const [encryptedText, setEncryptedText] = useState("");
  const [description, setDescription] = useState("");
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleRailsChange = (event) => {
    setRails(Number(event.target.value));
  };

  const encryptRailFenceCipher = (text, numRails) => {
    if (numRails === 1) return text;
    let rail = Array.from({ length: numRails }, () => "");
    let direction = 1;
    let row = 0;

    for (let char of text) {
      rail[row] += char;
      row += direction;
      if (row === 0 || row === numRails - 1) direction *= -1;
    }

    return rail.join("");
  };

  const handleEncrypt = () => {
    const encrypted = encryptRailFenceCipher(text, rails);
    setEncryptedText(encrypted);
    setDescription(
      `The Rail Fence Cipher arranges the text in a zigzag pattern across ${rails} rails and reads it off row by row.`
    );
    setShowAnalysis(false);
  };

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="rail-fence-container">
      <h3>Rail Fence Cipher</h3>
      <div className="input-group">
        <label>
          Number of Rails:
          <input
            type="number"
            value={rails}
            onChange={handleRailsChange}
            min="2"
          />
        </label>
      </div>
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedText && (
        <>
          <div className="result">
            <h4>Encrypted Text</h4>
            <textarea value={encryptedText} readOnly rows="10" cols="50" />
          </div>
          <div className="description">
            <h4>Encryption Process Description</h4>
            <p>{description}</p>
          </div>
          <button onClick={handleAnalyze}>Analyze</button>
          {showAnalysis && (
            <RailFenceAnalysis cipherText={encryptedText} numRails={rails} />
          )}
        </>
      )}
    </div>
  );
};

export default RailFenceCipher;
