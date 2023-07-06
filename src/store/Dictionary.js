import React, { createContext, useState, useEffect } from "react";

const DEFAULT_DICTIONARY = ['liste', 'amour', 'niche', 'tache', 'wagon', 'trucs', 'fruit', 'bonne'];

const DictionaryContext = createContext({
  isLoading: true,
  wordList: DEFAULT_DICTIONARY,
});

export function DictionaryProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [wordList, setWordList] = useState(DEFAULT_DICTIONARY);

  useEffect(() => {
    fetchDictionary();
  }, []);

  const fetchDictionary = async () => {
    try {
      const response = await fetch('/dictionary.txt');
      if (!response.ok) {
        throw new Error('Erreur lors de la requête');
      }
      const data = await response.text();
      const words = data.split('\n');
      setWordList(words);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier :', error);
      setWordList(DEFAULT_DICTIONARY);
      setIsLoading(false);
    }
  };

  return (
    <DictionaryContext.Provider value={{ isLoading, wordList }}>
      {props.children}
    </DictionaryContext.Provider>
  );
}

export default DictionaryContext; 
