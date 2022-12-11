import GuessCounter from "./GuessCounter";
import CurrentWordView from "./CurrentWordView";
import React, {useEffect, useState} from "react";
import {createEmptyArrayForWord, randomWord} from "../utils/wordGeneratorUtil";
import LandingPage from "./LandingPage";
import "./Game.css"
import {GameStats} from "./types";
import GameTimer from "./GameTimer";

function Game() {
  function getLocalGameHistoryData() {
    const statsDataString = localStorage.getItem("gameStats") || "[]";
    const parsedStorageData: GameStats[] = JSON.parse(statsDataString) || [];
    return parsedStorageData;
  }

  const [gameHistory, setGameHistory] = useState(getLocalGameHistoryData())
  const [gameInProgress, setGameInProgress] = useState(false)
  const [guessCount, setGuessCount] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [wordToGuess, setWordToGuess] = useState("randomWord")
  const [wordLengthAsArray, setWordLengthAsArray] = useState([""])

  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(gameTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTime]);

  function updateGuessCount() {
    const guesses = guessCount + 1;
    setGuessCount(guesses)
  }

  function resetGameTimer() {
    setGameTime(0)
  }

  function completeGame() {
    const updatedGameHistory = [...gameHistory];
    const gameStats: GameStats = {guessCount: guessCount, word: wordToGuess, time: gameTime}
    updatedGameHistory.push(gameStats)
    setGameHistory(updatedGameHistory);
    const existingGameData: GameStats[] = getLocalGameHistoryData()
    existingGameData.push(gameStats)
    localStorage.setItem("gameStats", JSON.stringify(existingGameData));
    resetGuessCount();
    resetGameTimer()
    setGameInProgress(false)
  }

  function resetGuessCount() {
    setGuessCount(0)
  }

  async function startGame() {
    const newWord = await randomWord();
    const guessArray = createEmptyArrayForWord(newWord);
    resetGameTimer()
    resetGuessCount()
    setWordToGuess(newWord)
    setWordLengthAsArray(guessArray)
    setGameInProgress(true)
  }

  function mainView() {
    if (!gameInProgress) {
      return <LandingPage startGameAction={startGame} gameStats={gameHistory}/>
    } else {
      return (
          <div className="Play">
            <CurrentWordView
                startingGuessArray={wordLengthAsArray}
                updateGuessCount={updateGuessCount}
                currentWord={wordToGuess}
                complete={completeGame}/>
            <div className={"Counters"}>
              <GuessCounter guesses={guessCount}/>
              <GameTimer gameTime={gameTime}/>
            </div>
          </div>
      )
    }
  }

  return <div className="Game">{mainView()}</div>
}

export default Game;