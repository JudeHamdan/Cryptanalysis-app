import React, { useState } from "react";
import "./EncryptionAlgorithms.css";

const englishFrequencies = "etaoinshrdlcumwfgypbvkjxqz";
const bigramFrequencies = {
  th: 0.0356,
  he: 0.0307,
  in: 0.0243,
  er: 0.0205,
  an: 0.0197,
  re: 0.0187,
  on: 0.017,
  at: 0.0149,
  en: 0.0145,
  nd: 0.0141,
  // Add more bigrams as needed
};

const frequencyAnalysis = (ciphertext) => {
  const frequencies = {};
  for (let char of ciphertext) {
    if (char.match(/[a-z]/)) {
      frequencies[char] = (frequencies[char] || 0) + 1;
    }
  }
  const sortedFreq = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
  return sortedFreq.map((item) => item[0]);
};

const calculateBigramFrequencies = (text) => {
  const frequencies = {};
  const totalBigrams = text.length - 1;

  for (let i = 0; i < text.length - 1; i++) {
    const bigram = text.slice(i, i + 2).toLowerCase();
    if (frequencies[bigram]) {
      frequencies[bigram] += 1;
    } else {
      frequencies[bigram] = 1;
    }
  }

  for (const bigram in frequencies) {
    frequencies[bigram] /= totalBigrams;
  }

  return frequencies;
};

const scoreTextWithBigrams = (text) => {
  const observedFrequencies = calculateBigramFrequencies(text);
  let score = 0;

  for (const bigram in observedFrequencies) {
    if (bigramFrequencies[bigram]) {
      score += observedFrequencies[bigram] * bigramFrequencies[bigram];
    }
  }

  return score;
};

const decryptWithFrequencyAnalysis = (ciphertext) => {
  const cipherFrequencies = frequencyAnalysis(ciphertext);
  const possibleMappings = [];

  // Generate possible mappings by shifting frequency list
  for (let shift = 0; shift < englishFrequencies.length; shift++) {
    const decryptionKey = {};
    cipherFrequencies.forEach((char, index) => {
      const shiftedIndex = (index + shift) % englishFrequencies.length;
      decryptionKey[char] = englishFrequencies[shiftedIndex];
    });
    possibleMappings.push(decryptionKey);
  }

  let bestDecryption = "";
  let highestScore = -Infinity;

  // Evaluate each possible mapping
  for (const mapping of possibleMappings) {
    const decryptedText = ciphertext
      .split("")
      .map((char) => mapping[char] || char)
      .join("");
    const score = scoreTextWithBigrams(decryptedText);
    if (score > highestScore) {
      highestScore = score;
      bestDecryption = decryptedText;
    }
  }

  return bestDecryption;
};

const FrequencyAnalysisAttack = ({ cipherText }) => {
  const [decryptedText, setDecryptedText] = useState("");

  const handleAnalyze = () => {
    const decrypted = decryptWithFrequencyAnalysis(cipherText);
    setDecryptedText(decrypted);
  };

  return (
    <div className="analysis-container">
      <h3>Frequency Analysis Attack</h3>
      <button onClick={handleAnalyze}>Analyze</button>
      {decryptedText && (
        <>
          <div className="result">
            <h4>Decrypted Text</h4>
            <textarea value={decryptedText} readOnly rows="10" cols="50" />
          </div>
        </>
      )}
    </div>
  );
};

export default FrequencyAnalysisAttack;
