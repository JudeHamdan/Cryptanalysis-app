import React, { useState } from "react";

// Caesar Cipher Component
const CaesarCipher = ({ text }) => {
  const [shift, setShift] = useState(0);
  const [encryptedText, setEncryptedText] = useState("");
  const [description, setDescription] = useState("");
  const [bestShift, setBestShift] = useState(null);
  const [bestDecryptedText, setBestDecryptedText] = useState("");

  const englishFrequencies = {
    a: 8.167,
    b: 1.492,
    c: 2.782,
    d: 4.253,
    e: 12.702,
    f: 2.228,
    g: 2.015,
    h: 6.094,
    i: 6.966,
    j: 0.153,
    k: 0.772,
    l: 4.025,
    m: 2.406,
    n: 6.749,
    o: 7.507,
    p: 1.929,
    q: 0.095,
    r: 5.987,
    s: 6.327,
    t: 9.056,
    u: 2.758,
    v: 0.978,
    w: 2.36,
    x: 0.15,
    y: 1.974,
    z: 0.074,
  };

  const bigramFrequencies = {
    th: 1.52,
    he: 1.28,
    in: 0.94,
    er: 0.94,
    an: 0.82,
    re: 0.68,
    nd: 0.63,
    at: 0.59,
    on: 0.57,
    nt: 0.56,
    // Add more bigrams as needed
  };

  // Handle changes to the shift input
  const handleShiftChange = (event) => {
    setShift(Number(event.target.value));
  };

  // Function to encrypt text using the Caesar Cipher
  const encryptCaesarCipher = (text, shift) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift) % 26) + start
      );
    });
  };

  // Function to calculate the frequency of letters in a given text
  const calculateLetterFrequencies = (text) => {
    const frequencies = {};
    let totalLetters = 0;

    for (let char of text.toLowerCase()) {
      if (char >= "a" && char <= "z") {
        frequencies[char] = (frequencies[char] || 0) + 1;
        totalLetters += 1;
      }
    }

    for (let char in frequencies) {
      frequencies[char] = (frequencies[char] / totalLetters) * 100;
    }

    return frequencies;
  };

  // Function to calculate the chi-squared statistic for comparing observed and expected frequencies
  const chiSquared = (observed, expected) => {
    let chiSquared = 0;

    for (let char in expected) {
      const expectedValue = expected[char];
      const observedValue = observed[char] || 0;

      chiSquared += Math.pow(observedValue - expectedValue, 2) / expectedValue;
    }

    return chiSquared;
  };

  // Brute Force Analysis to decrypt the text
  const analyzeCaesarCipher = (ciphertext) => {
    let bestShift = 0;
    let lowestChiSquared = Infinity;
    let bestDecryption = "";

    for (let shift = 0; shift < 26; shift++) {
      const decryptedText = ciphertext.replace(/[a-zA-Z]/g, (char) => {
        const start = char <= "Z" ? 65 : 97;
        return String.fromCharCode(
          ((char.charCodeAt(0) - start - shift + 26) % 26) + start
        );
      });

      const observedFrequencies = calculateLetterFrequencies(decryptedText);
      const chiSquaredValue = chiSquared(
        observedFrequencies,
        englishFrequencies
      );

      if (chiSquaredValue < lowestChiSquared) {
        lowestChiSquared = chiSquaredValue;
        bestShift = shift;
        bestDecryption = decryptedText;
      }
    }

    return { bestShift, bestDecryption };
  };

  // Improved Linguistic Analysis to decrypt the text by guessing 'e'
  const linguisticAnalyzeCaesarCipher = (ciphertext) => {
    const observedFrequencies = calculateLetterFrequencies(ciphertext);
    const mostFrequentLetter = Object.keys(observedFrequencies).reduce((a, b) =>
      observedFrequencies[a] > observedFrequencies[b] ? a : b
    );

    // Calculate shift assuming the most frequent letter is 'e'
    const shift =
      (mostFrequentLetter.charCodeAt(0) - "e".charCodeAt(0) + 26) % 26;

    // Decrypt the text with the inferred shift
    const decryptedText = ciphertext.replace(/[a-zA-Z]/g, (char) => {
      const start = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start - shift + 26) % 26) + start
      );
    });

    return { bestShift: shift, bestDecryption: decryptedText };
  };

  // Handle encryption button click
  const handleEncrypt = () => {
    const encrypted = encryptCaesarCipher(text, shift);
    setEncryptedText(encrypted);
    setDescription(
      `The Caesar Cipher shifts each letter in the text by ${shift} positions in the alphabet.`
    );
  };

  // Handle brute force analysis button click
  const handleBruteForceAnalyze = () => {
    const analysis = analyzeCaesarCipher(encryptedText);
    setBestShift(analysis.bestShift);
    setBestDecryptedText(analysis.bestDecryption);
  };

  // Handle linguistic analysis button click
  const handleLinguisticAnalyze = () => {
    const analysis = linguisticAnalyzeCaesarCipher(encryptedText);
    setBestShift(analysis.bestShift);
    setBestDecryptedText(analysis.bestDecryption);
  };

  // Render the Caesar Cipher component
  return (
    <div className="caesar-cipher-container">
      <h3>Caesar Cipher</h3>
      <div className="input-group">
        <label>
          Shift for Caesar Cipher:
          <input type="number" value={shift} onChange={handleShiftChange} />
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
          <button onClick={handleBruteForceAnalyze}>Brute Force Analyze</button>
          <button onClick={handleLinguisticAnalyze}>Linguistic Analyze</button>
        </>
      )}
      {bestDecryptedText && (
        <div className="analysis">
          <h4>Analysis Results</h4>
          <p>The most likely shift is {bestShift}.</p>
          <div className="best-decryption">
            <h4>Decrypted Text</h4>
            <p>{bestDecryptedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaesarCipher;
