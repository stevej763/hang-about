import "./Game.css"
import React, {useEffect, useState} from "react";
import {DailyStats, GameStats} from "./types";
import {createEmptyArrayForWord} from "../utils/wordGeneratorUtil";
import {getLongDailyWord, getMediumDailyWord, getRandomWord, getShortDailyWord} from "../api/DailyWords";
import GuessCounter from "./GuessCounter";
import CurrentWordView from "./CurrentWordView";
import LandingPage from "./LandingPage";
import GameTimer from "./GameTimer";

function Game() {
  function getLocalGameHistoryData() {
    const statsDataString = localStorage.getItem("gameStats") || "[]";
    const parsedStorageData: GameStats[] = JSON.parse(statsDataString) || [];
    return parsedStorageData;
  }

  const [gameHistory, setGameHistory] = useState(getLocalGameHistoryData())
  const [inGame, setInGame] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [guessCount, setGuessCount] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [wordToGuess, setWordToGuess] = useState("none")
  const [wordLengthAsArray, setWordLengthAsArray] = useState([""])

  useEffect(() => {
    if (gameActive) {
      const interval = setInterval(() => {
        setGameTime(gameTime + 10);
      }, 10);
      return () => clearInterval(interval);
    }

  }, [gameTime, gameActive]);

  function updateGuessCount() {
    const guesses = guessCount + 1;
    setGuessCount(guesses)
    return guesses
  }

  function resetGameTimer() {
    setGameTime(0)
  }

  function completeGame(letterHistory: string[]) {
    const updatedGameHistory = [...gameHistory];
    const gameStats: GameStats = {
      guessCount: guessCount,
      word: wordToGuess,
      time: gameTime,
      letterHistory: letterHistory
    }
    updatedGameHistory.push(gameStats)
    setGameHistory(updatedGameHistory);
    const existingGameData: GameStats[] = getLocalGameHistoryData()
    existingGameData.push(gameStats)
    const value = JSON.stringify(existingGameData);
    localStorage.setItem("gameStats", value);
    resetGuessCount();
    resetGameTimer()
    setInGame(false)
  }

  function resetGuessCount() {
    setGuessCount(0)
  }

  function startGameTimer() {
    setGameActive(false)
  }

  function triggerGameFor(newWord: string) {
    const guessArray = createEmptyArrayForWord(newWord);
    resetGameTimer()
    resetGuessCount()
    setWordToGuess(newWord)
    setWordLengthAsArray(guessArray)
    setInGame(true)
    setGameActive(true)
  }

  async function startUnlimitedMode() {
    const newWord = await getRandomWord();
    triggerGameFor(newWord);
  }

  async function shortRoundMode() {
    const newWord = await getShortDailyWord();
    triggerGameFor(newWord)
  }
  async function mediumRoundMode() {
    const newWord = await getMediumDailyWord();
    triggerGameFor(newWord)
  }
  async function longRoundMode() {
    const newWord = await getLongDailyWord();
    triggerGameFor(newWord)
  }


  function mainView() {
    if (!inGame) {

      const dailyStats: DailyStats = {
        short: {complete: false},
        medium: {complete: false},
        long: {complete: true}
      }

      return <LandingPage
          unlimitedModeAction={startUnlimitedMode}
          shortRoundAction={shortRoundMode}
          mediumRoundAction={mediumRoundMode}
          longRoundAction={longRoundMode}
          gameStats={gameHistory}
          dailyStats={dailyStats}
      />
    } else {
      return (
          <div className="Play">
            <CurrentWordView
                startingGuessArray={wordLengthAsArray}
                updateGuessCount={updateGuessCount}
                currentWord={wordToGuess}
                currentGuessCount={guessCount}
                gameTime={gameTime}
                complete={completeGame}
                stopGameTimer={startGameTimer}
            />

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