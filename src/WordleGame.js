import React, { useState, useEffect, useContext } from "react";
import UserContext from "./store/UserContext";
import DictionaryContext from "./store/Dictionary";

const WordleGame = () => {
  const userCtx = useContext(UserContext);
  const dictionaryCtx = useContext(DictionaryContext); 

  const [wordLength, setWordLength] = useState(userCtx.userWordLength);
  const [score, setScore] = useState(userCtx.score);
  const [currentGame, setCurrentGame] = useState(userCtx.userCurrentGame);
  const [guessesLeft, setGuessesLeft] = useState(userCtx.userMaxTry);

  const dictionary = dictionaryCtx.wordList;
  const isLoading = dictionaryCtx.isLoading;

  const [guess, setGuess] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [correctPositions, setCorrectPositions] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wordHistory, setWordHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(currentGame.word === '') {
      if(!isLoading) {
        generateTargetWord();
      }
    } else {
      setTargetWord(currentGame.word);
      setWordHistory(currentGame.guesses);
      setGuessesLeft(userCtx.userMaxTry - currentGame.guesses.length);

      if(guessesLeft <= 0) {
        setIsGameOver(true);
      }

      if(currentGame.guesses.some((objet) => objet.word.toLowerCase() === currentGame.word.toLowerCase())) {
        setIsGameOver(true);
        setIsGameWon(true);
      }
    }

  }, [isLoading]);

  useEffect(() => {
    if (guess.length === wordLength) {
      setErrorMessage("");
    }

  }, [guess, wordLength]);


  const generateTargetWord = () => {
    try {
      if (!dictionary) {
        console.error("Dictionary is undefined");
        return;
      }

      const filteredWords = dictionary.filter((word) => word.length == wordLength);
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      const randomWord = filteredWords[randomIndex];
      console.log("randomWord="+randomWord);
      setTargetWord(randomWord);

      currentGame.word = randomWord;
      currentGame.guesses = [];
      userCtx.setUserCurrentGame(currentGame);

    } catch (error) {
      console.error("Error loading dictionary:", error);
    }
  };

  const isWordInArray = (word, array) => {
    const lowercaseWord = word.toLowerCase();
    return array.some((item) => item.toLowerCase() === lowercaseWord);
  };

  function checkValidWord(word) {
    try {
      const isValid = isWordInArray(word, dictionary);
      return isValid;
    } catch (error) {
      console.error("Error loading dictionary:", error);
    }
    return false;
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
      setErrorMessage(`Le mot proposé doit avoir ${wordLength} lettres.`);
      return;
    }

    if (!checkValidWord(guess)) {
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

    currentGame.guesses.push(wordEntry);
    userCtx.setUserCurrentGame(currentGame);

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

    if (isLoading) {
      return <p>Chargement en cours...</p>;
    }

    
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
