import React, { useState } from "react";
import "./EncryptionAlgorithms.css";
import CaesarCipher from "./CaesarCipher";
import VigenereCipher from "./VigenereCipher";
import RailFenceCipher from "./RailFenceCipher";
import MonopolisticEncryption from "./MonopolisticEncryption";
import FrequencyAnalysisAttack from "./FrequencyAnalysisAttack";

const EncryptionAlgorithms = ({ text }) => {
  const [algorithm, setAlgorithm] = useState("caesar");

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  return (
    <div className="encryption-container">
      <h2>Encryption Algorithms</h2>
      <div className="input-group">
        <label>
          Select Algorithm:
          <select value={algorithm} onChange={handleAlgorithmChange}>
            <option value="caesar">Caesar Cipher</option>
            <option value="vigenere">Vigenère Cipher</option>
            <option value="railFence">Rail Fence Cipher</option>
            <option value="monopolistic">Monopolistic Cipher</option>
          </select>
        </label>
      </div>
      {algorithm === "caesar" && <CaesarCipher text={text} />}
      {algorithm === "vigenere" && <VigenereCipher text={text} />}
      {algorithm === "railFence" && <RailFenceCipher text={text} />}
      {algorithm === "monopolistic" && <MonopolisticEncryption text={text} />}
      {algorithm === "monopolistic" && (
        <FrequencyAnalysisAttack cipherText={text} />
      )}
    </div>
  );
};

export default EncryptionAlgorithms;
