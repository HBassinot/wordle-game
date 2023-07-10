import React, { createContext } from "react";

const KEY_MAX_TRY = 'MAX_TRY';
const DEFAULT_MAX_TRY = 6;

const KEY_WORD_LENGTH = 'WORD_LENGTH';
const DEFAULT_WORD_LENGTH = 5;
export const WORD_LENGTH_MIN = 3;
export const WORD_LENGTH_MAX = 10;

const DEFAULT_SCORE = 0;
const KEY_SCORE = 'SCORE';

const KEY_CURRENT_GAME = 'CURRENT_GAME';
const DEFAULT_GAME = {word:'',guesses:[]};

const UserContext = createContext({
  userWordLength: DEFAULT_WORD_LENGTH,
  userMaxTry: DEFAULT_MAX_TRY,
  userScore: DEFAULT_SCORE,
  userCurrentGame: DEFAULT_GAME,

  setWordLength: () => { return; },
  setMaxTry: () => { return; },
  setUserCurrentGame: () => { return; },
});

export function UserContextProvider(props) {
  const context = {
    userScore: getUserScore(),
    userWordLength: getUserWordLength(),
    userMaxTry: getUserMaxTry(),
    userCurrentGame: getUserCurrentGame(),

    setWordLength: (value) => {
      setUserWordLength(value);
    },
    setMaxTry: (value) => {
      setUserMaxTry(value);
    },
    setUserCurrentGame: (value) => {
      setUserCurrentGame(value);
    }
  };

  function setUserMaxTry(value) {
    setValueLocalStorage(KEY_MAX_TRY, value);
  }

  function setUserWordLength(value) {
    setValueLocalStorage(KEY_WORD_LENGTH, value);
  }

  function setUserCurrentGame(value) {
    const gameJSON = JSON.stringify(value);
    setValueLocalStorage(KEY_CURRENT_GAME, gameJSON);
  }

  function getUserCurrentGame() {
    var gameJSON = getValueLocalStorage(KEY_CURRENT_GAME);
    if (gameJSON) {
      const savedGame = JSON.parse(gameJSON);
      return savedGame;
    }
    return DEFAULT_GAME;
  }

  function getUserScore() {
    var score = getValueLocalStorage(KEY_SCORE);
    if (score) return score;
    return DEFAULT_SCORE;
  }

  function getUserWordLength() {
    var length = getValueLocalStorage(KEY_WORD_LENGTH);

    if (length) {
      return length;
    }

    return DEFAULT_WORD_LENGTH;
  }

  function getUserMaxTry() {
    var max = getValueLocalStorage(KEY_MAX_TRY);
    if (max) return max;
    return DEFAULT_MAX_TRY;
  }

  function getValueLocalStorage(key) {
    const storage = localStorage;
    return storage.getItem(key);
  }

  function setValueLocalStorage(key, value) {
    const storage = localStorage;
    storage.setItem(key, value);
  }

  return (
    <UserContext.Provider value={context}>
        {props.children}
    </UserContext.Provider>
    );
}

export default UserContext;
