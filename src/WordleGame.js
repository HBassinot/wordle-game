import React, { useState, useEffect, useContext } from "react";
import UserContext from "./store/user-context";

const WordleGame = () => {
  const userCtx = useContext(UserContext);
  const score = userCtx.score;

  const [wordLength, setWordLength] = useState(userCtx.userWordLength);
  const [guessesLeft, setGuessesLeft] = useState(userCtx.userMaxTry);

  const [guess, setGuess] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const [correctPositions, setCorrectPositions] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wordHistory, setWordHistory] = useState([]);
  const [isValidWord, setIsValidWord] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    generateTargetWord();
  }, []);

  useEffect(() => {
    if (guess.length === wordLength) {
      setErrorMessage("");
    }
  }, [guess, wordLength, isValidWord]);

  const generateTargetWord = async () => {
    try {
      const response = await fetch("/dictionary.txt");
      const data = await response.text();
      const words = data.split("\n");
      const filteredWords = words.filter((word) => word.length == wordLength);
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      const randomWord = filteredWords[randomIndex];
      console.log("randomWord="+randomWord);
      setTargetWord(randomWord);
    } catch (error) {
      console.error("Error loading dictionary:", error);
    }
  };

  const isWordInArray = (word, array) => {
    const lowercaseWord = word.toLowerCase();
    return array.some((item) => item.toLowerCase() === lowercaseWord);
  };

  const checkValidWord = async (word) => {
    try {
      const response = await fetch("/dictionary.txt");
      const data = await response.text();
      const words = data.split("\n");
      const isValid = isWordInArray(word, words);
      setIsValidWord(isValid);
    } catch (error) {
      console.error("Error loading dictionary:", error);
    }
  };

  const countLetterOccurrences = (word) => {
    const occurrences = {};
    for (let i = 0; i < word.length; i++) {
      const letter = word[i];
      occurrences[letter] = occurrences[letter] ? occurrences[letter] + 1 : 1;
    }
    return occurrences;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (guess.length != wordLength) {
      setIsValidWord(false);
      setErrorMessage(`Le mot proposé doit avoir ${wordLength} lettres.`);
      return;
    }

    checkValidWord(guess);
    if (!isValidWord) {
      setErrorMessage(`Le mot '${guess}' n'est pas un mot valide.`);
      return;
    } else {
      setErrorMessage("");
    }

    
    const guessArray = guess.toUpperCase().split("");
    const targetArray = targetWord.toUpperCase().split("");
    
    const positions = [];
    const letters = [];
    const guessOccurrences = countLetterOccurrences(guessArray);
    const targetOccurrences = countLetterOccurrences(targetArray);

    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] === targetArray[i]) {
        positions.push(i);
        guessOccurrences[guessArray[i]]--;
        targetOccurrences[targetArray[i]]--;
      }
    }

    for (let i = 0; i < guessArray.length; i++) {
      if (guessArray[i] !== targetArray[i]) {
        if (targetOccurrences[guessArray[i]] > 0) {
          letters.push(i);
          targetOccurrences[guessArray[i]]--;
        }
      }
    }

    const wordEntry = {
      word: guess,
      correctPositions: positions,
      correctLetters: letters,
    };

    const updatedWordHistory = [...wordHistory, wordEntry];
    setWordHistory(updatedWordHistory);

    if (positions.length === targetArray.length) {
      setIsGameOver(true);
      setIsGameWon(true);
    } else if (guessesLeft === 1) {
      setIsGameOver(true);
    } else {
      
      setCorrectPositions(positions);
      setCorrectLetters(letters);
    }
    setGuessesLeft((prevGuessesLeft) => prevGuessesLeft - 1);
    setGuess("");
  };

  const handleReset = () => {
    setGuess("");
    setIsGameOver(false);
    setIsGameWon(false);
    setGuessesLeft(userCtx.userMaxTry);
    setCorrectPositions([]);
    setCorrectLetters([]);
    setWordHistory([]);
    setErrorMessage("");
    generateTargetWord();
  };

  const renderWord = (wordEntry, index) => {
    const wordArray = wordEntry.word.toUpperCase().split("");

    return (
      <div key={index} className="word-entry">
        {wordArray.map((letter, letterIndex) => {
          let letterClass = "";

          if (wordEntry.correctPositions.includes(letterIndex)) {
            letterClass = "correct-position";
          } else if (wordEntry.correctLetters.includes(letterIndex)) {
            letterClass = "correct-letter";
          } else {
            letterClass = "incorrect-letter";
          }

          return (
            <span key={letterIndex} className={`letter ${letterClass}`}>
              {letter}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="wordle-body">
      <h2>Devinez le mot de {wordLength} lettres</h2>

      <p>Tentatives restantes : {guessesLeft}</p>
      {!isGameOver && (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={guess}
              maxLength={wordLength}
              onChange={(event) => setGuess(event.target.value)}
            />
          </label>
          <button type="submit">Valider</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}

      {isGameOver && (
        <div>
          {isGameWon ? (
            <h3>BRAVO !</h3>
          ) : (
            <h3>PERDU ! Le mot était : {targetWord}</h3>
          )}
          <button onClick={handleReset}>Rejouer</button>
        </div>
      )}

      <div className="word-history">
        <h3>Mots proposés :</h3>
        <div className="word-grid">
          {wordHistory.map((wordEntry, index) =>
            renderWord(wordEntry, index)
          )}
        </div>
      </div>
    </div>
  );
};

export default WordleGame;
