import React, { useState } from "react";
import "./EncryptionAlgorithms.css";

const generateKey = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
};

const encryptMonopolistic = (plaintext, key) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const table = new Map();
  for (let i = 0; i < alphabet.length; i++) {
    table.set(alphabet[i], key[i]);
  }
  return plaintext
    .split("")
    .map((char) => table.get(char) || char)
    .join("");
};

const MonopolisticEncryption = ({ text }) => {
  const [key, setKey] = useState(generateKey());
  const [encryptedText, setEncryptedText] = useState("");
  const [description, setDescription] = useState("");

  const handleEncrypt = () => {
    const encrypted = encryptMonopolistic(text, key);
    setEncryptedText(encrypted);
    setDescription(
      `The Monopolistic Cipher uses a randomly generated key for substitution. Key: ${key}`
    );
  };

  return (
    <div className="encryption-container">
      <h3>Monopolistic Encryption</h3>
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
        </>
      )}
    </div>
  );
};

export default MonopolisticEncryption;
