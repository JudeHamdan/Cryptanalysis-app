// src/App.js
import React from "react";
import FileUpload from "./components/FileUpload";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cryptanalysis App</h1>
      </header>
      <main>
        <FileUpload />
      </main>
    </div>
  );
};

export default App;
