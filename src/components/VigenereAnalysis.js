import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const EN_REL_FREQ = {
  A: 0.082,
  B: 0.015,
  C: 0.028,
  D: 0.043,
  E: 0.13,
  F: 0.022,
  G: 0.02,
  H: 0.061,
  I: 0.07,
  J: 0.0015,
  K: 0.0077,
  L: 0.04,
  M: 0.024,
  N: 0.067,
  O: 0.075,
  P: 0.019,
  Q: 0.00095,
  R: 0.06,
  S: 0.063,
  T: 0.091,
  U: 0.028,
  V: 0.0098,
  W: 0.024,
  X: 0.0015,
  Y: 0.02,
  Z: 0.00074,
};

const getLetterCounts = (text) => {
  const letterCounts = {};
  for (let char of text) {
    if (char in letterCounts) {
      letterCounts[char]++;
    } else {
      letterCounts[char] = 1;
    }
  }
  return letterCounts;
};

const getLetterFrequencies = (text) => {
  const letterCounts = getLetterCounts(text);
  const total = Object.values(letterCounts).reduce(
    (sum, count) => sum + count,
    0
  );
  const frequencies = {};
  for (let [letter, count] of Object.entries(letterCounts)) {
    frequencies[letter] = count / total;
  }
  return frequencies;
};

const VigenereAnalysis = ({ cipherText }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleAnalyze = () => {
    const frequencies = getLetterFrequencies(cipherText);
    const result = {
      frequencies,
    };
    setAnalysisResult(result);

    const labels = Object.keys(EN_REL_FREQ);
    const englishFreq = labels.map((letter) => EN_REL_FREQ[letter]);
    const textFreq = labels.map((letter) => frequencies[letter] || 0);

    const data = {
      labels,
      datasets: [
        {
          label: "English Language Frequency",
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75,192,192,0.6)",
          hoverBorderColor: "rgba(75,192,192,1)",
          data: englishFreq,
        },
        {
          label: "Cipher Text Frequency",
          backgroundColor: "rgba(255,99,132,0.4)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.6)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: textFreq,
        },
      ],
    };
    setChartData(data);
  };

  return (
    <div className="analysis-container">
      <button onClick={handleAnalyze}>Analyze Vigenère Cipher</button>
      {analysisResult && (
        <div>
          <h3>Analysis Results</h3>
          {chartData && (
            <div>
              <h4>Letter Frequency Comparison</h4>
              <Bar data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VigenereAnalysis;
