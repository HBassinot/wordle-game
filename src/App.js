import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WordleGame from "./WordleGame";
import Header from "./Header";
import Footer from "./Footer";
import Error404 from "./Error404";

import { UserContextProvider } from "./store/UserContext";
import { DictionaryProvider } from "./store/Dictionary"; 

import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <UserContextProvider>
        <Header />
        <DictionaryProvider>

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<WordleGame/>} />
              <Route path="*" element={<Error404/>} />
            </Routes>
          </BrowserRouter>

        </DictionaryProvider>
        <Footer />
      </UserContextProvider>
    </div>
  );
};

export default App;