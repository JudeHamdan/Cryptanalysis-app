import React, { useState } from "react";

import VigenereAnalysis from "./VigenereAnalysis";

const VigenereCipher = ({ text }) => {
  const [keyword, setKeyword] = useState("");
  const [encryptedText, setEncryptedText] = useState("");
  const [description, setDescription] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const encryptVigenereCipher = (text, keyword) => {
    let encrypted = "";
    const keywordRepeat = keyword
      .repeat(Math.ceil(text.length / keyword.length))
      .slice(0, text.length);

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char.match(/[a-zA-Z]/)) {
        const start = char <= "Z" ? 65 : 97;
        const shift = keywordRepeat[i].toUpperCase().charCodeAt(0) - 65;
        encrypted += String.fromCharCode(
          ((char.charCodeAt(0) - start + shift) % 26) + start
        );
      } else {
        encrypted += char;
      }
    }
    return encrypted;
  };

  const handleEncrypt = () => {
    const encrypted = encryptVigenereCipher(text, keyword);
    setEncryptedText(encrypted);
    setDescription(
      `The Vigenère Cipher uses the keyword "${keyword}" to shift the letters in the text. Each letter in the text is shifted by the corresponding letter in the repeated keyword.`
    );
  };

  return (
    <div className="vigenere-cipher-container">
      <h3>Vigenère Cipher</h3>
      <div className="input-group">
        <label>
          Keyword for Vigenère Cipher:
          <input type="text" value={keyword} onChange={handleKeywordChange} />
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
          <VigenereAnalysis cipherText={encryptedText} />
        </>
      )}
    </div>
  );
};

export default VigenereCipher;
