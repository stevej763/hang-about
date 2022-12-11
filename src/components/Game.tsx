import GuessCounter from "./GuessCounter";
import CurrentWordView from "./CurrentWordView";
import React, {useState} from "react";
import {createGuessArrayForWord, randomWord} from "../utils/wordGeneratorUtil";
import LandingPage from "./LandingPage";
import "./Game.css"
import {GameStats} from "./types";


function Game() {
  function getLocalGameHistoryData() {
    let parsedStorageData: GameStats[] = JSON.parse(localStorage.getItem("gameStats") || "[]") || [];
    return parsedStorageData;
  }

  const [gameHistory, setGameHistory] = useState(getLocalGameHistoryData())
  const [showLandingPage, setShowLandingPage] = useState(true)
  const [guessCount, setGuessCount] = useState(0)
  const [wordToGuess, setWordToGuess] = useState("randomWord")
  const [wordLengthAsArray, setWordLengthAsArray] = useState([""])

  function updateGuessCount() {
    let guesses = guessCount + 1;
    setGuessCount(guesses)
  }

  function completeGame() {
    const updatedGameHistory = [...gameHistory];
    const gameStats: GameStats = {guessCount: guessCount, word: wordToGuess}
    updatedGameHistory.push(gameStats)
    setGameHistory(updatedGameHistory);
    let existingGameData: GameStats[] = getLocalGameHistoryData()
    existingGameData.push(gameStats)
    localStorage.setItem("gameStats", JSON.stringify(existingGameData));

    resetGuessCount();
    setShowLandingPage(true)
  }

  function resetGuessCount() {
    setGuessCount(0)
  }

  function startGame() {
    let newWord = randomWord();
    const guessArray = createGuessArrayForWord(newWord);
    setWordToGuess(newWord)
    setWordLengthAsArray(guessArray)
    setShowLandingPage(false)

  }

  function mainView() {
    if (showLandingPage) {
      return (
          <div className="Game">
            <LandingPage startGameAction={startGame} gameStats={gameHistory}/>
          </div>
      )
    } else {
      return (
          <div className="Game">
            <CurrentWordView startingGuessArray={wordLengthAsArray}
                             updateGuessCount={updateGuessCount}
                             currentWord={wordToGuess}
                             complete={completeGame}/>
            <GuessCounter guesses={guessCount}/>
          </div>
      )
    }
  }

  return mainView();
}

export default Game;