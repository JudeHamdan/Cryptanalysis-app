import React, { useState, useEffect } from "react";

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
  // ... (add more bigrams and their frequencies)
};

const RailFenceAnalysis = ({ cipherText, numRails }) => {
  const [analysisDescription, setAnalysisDescription] = useState("");
  const [bestDecryptedText, setBestDecryptedText] = useState("");

  useEffect(() => {
    const analyzeRailFenceCipher = (cipherText, maxRails) => {
      let bestRails = 0;
      let bestDecryption = "";
      let highestScore = -Infinity;

      for (let rails = 2; rails <= maxRails; rails++) {
        const decryptedText = decryptRailFenceCipher(cipherText, rails);
        const score = scoreTextWithBigrams(decryptedText);

        if (score > highestScore) {
          highestScore = score;
          bestRails = rails;
          bestDecryption = decryptedText;
        }
      }

      return { bestRails, bestDecryption };
    };

    const decryptRailFenceCipher = (text, numRails) => {
      if (numRails === 1) return text;

      const n = text.length;
      const fence = Array.from({ length: numRails }, () => Array(n).fill(null));

      let directionDown = null;
      let row = 0,
        col = 0;

      for (let i = 0; i < n; i++) {
        if (row === 0) {
          directionDown = true;
        } else if (row === numRails - 1) {
          directionDown = false;
        }
        fence[row][col++] = "*";
        row += directionDown ? 1 : -1;
      }

      let index = 0;
      for (let i = 0; i < numRails; i++) {
        for (let j = 0; j < n; j++) {
          if (fence[i][j] === "*" && index < n) {
            fence[i][j] = text[index++];
          }
        }
      }

      let result = "";
      row = 0;
      col = 0;
      for (let i = 0; i < n; i++) {
        if (row === 0) {
          directionDown = true;
        } else if (row === numRails - 1) {
          directionDown = false;
        }
        if (fence[row][col] !== null) {
          result += fence[row][col++];
        }
        row += directionDown ? 1 : -1;
      }

      return result;
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

    const analysis = analyzeRailFenceCipher(cipherText, numRails);
    setAnalysisDescription(
      `The most likely number of rails is ${analysis.bestRails}.`
    );
    setBestDecryptedText(analysis.bestDecryption);
  }, [cipherText, numRails]);

  return (
    <div className="rail-fence-analysis-container">
      <h4>Analysis Results</h4>
      <p>{analysisDescription}</p>
      {bestDecryptedText && (
        <div className="best-decryption">
          <h4>Decrypted Text</h4>
          <p>{bestDecryptedText}</p>
        </div>
      )}
    </div>
  );
};

export default RailFenceAnalysis;
