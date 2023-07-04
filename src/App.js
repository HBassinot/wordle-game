import React from "react";
import WordleGame from "./WordleGame";
import Header from "./Header";
import Footer from "./Footer";
import { UserContextProvider } from "./store/user-context";

import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <UserContextProvider>
        <Header />
        <WordleGame />
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default App;