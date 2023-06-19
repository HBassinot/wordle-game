import React from "react";
import WordleGame from "./WordleGame";
import Header from "./Header";
import Footer from "./Footer";
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <WordleGame />
      <Footer />
    </div>
  );
};

export default App;