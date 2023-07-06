import React from "react";
import WordleGame from "./WordleGame";
import Header from "./Header";
import Footer from "./Footer";
import { UserContextProvider } from "./store/UserContext";
import { DictionaryProvider } from "./store/Dictionary"; 

import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <UserContextProvider>
        <Header />
        <DictionaryProvider>
          <WordleGame />
        </DictionaryProvider>
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default App;