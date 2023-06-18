import React, { useState, useEffect } from "react";

const WordleGame = () => {
  const [guess, setGuess] = useState("");
  const [targetWord, setTargetWord] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [correctPositions, setCorrectPositions] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wordHistory, setWordHistory] = useState([]);
  const [isValidWord, setIsValidWord] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    generateTargetWord();
  }, []);

  const generateTargetWord = () => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((data) => {
        const words = data.split("\n");
        const filteredWords = words.filter((word) => word.length === 5);
        const randomIndex = Math.floor(Math.random() * filteredWords.length);
        const randomWord = filteredWords[randomIndex];
        setTargetWord(randomWord);
      })
      .catch((error) => {
        console.error("Error loading dictionary:", error);
      });
  };

  const checkValidWord = (word) => {
    fetch("/dictionary.txt")
      .then((response) => response.text())
      .then((data) => {
        const words = data.split("\n");
        const isValid = words.includes(word.toUpperCase());
        setIsValidWord(isValid);
        if (!isValid) {
          setErrorMessage("Le mot proposé n'est pas valide.");
        } else {
          setErrorMessage("");
        }
      })
      .catch((error) => {
        console.error("Error loading dictionary:", error);
      });
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

    if (guess.length !== 5) {
      setIsValidWord(false);
      setErrorMessage("Le mot proposé doit avoir 5 lettres.");
      return;
    }

    checkValidWord(guess);

    if (!isValidWord) {
      return;
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
      setGuess("");
      setGuessesLeft(guessesLeft - 1);
      setCorrectPositions(positions);
      setCorrectLetters(letters);
    }
  };

  const handleReset = () => {
    setGuess("");
    setIsGameOver(false);
    setIsGameWon(false);
    setGuessesLeft(6);
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
    <div>
      <h1>Wordle</h1>
      {!isGameOver && (
        <form onSubmit={handleSubmit}>
          <label>
            Guess:
            <input
              type="text"
              value={guess}
              maxLength={5}
              onChange={(event) => setGuess(event.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      )}

      {isGameOver && (
        <div>
          {isGameWon ? (
            <h2>You won!</h2>
          ) : (
            <h2>You lost! The word was {targetWord}</h2>
          )}
          <button onClick={handleReset}>Play Again</button>
        </div>
      )}

      <p>Guesses left: {guessesLeft}</p>

      <div className="word-history">
        <h3>Word History:</h3>
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
