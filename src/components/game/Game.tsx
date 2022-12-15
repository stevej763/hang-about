import "./Game.css"
import React, {useEffect, useState} from "react";
import {DailyStats, GameStats} from "../types";
import {createEmptyArrayForWord} from "../../utils/wordGeneratorUtil";
import {getLongDailyWord, getMediumDailyWord, getRandomWord, getShortDailyWord} from "../../api/DailyWords";
import GuessCounter from "./GuessCounter";
import CurrentGameLetterInputs from "./CurrentGameLetterInputs";
import LandingPage from "../home/LandingPage";
import GameTimer from "./GameTimer";

function Game() {
  function getLocalGameHistoryData() {
    const statsDataString = localStorage.getItem("gameStats") || "[]";
    const parsedStorageData: GameStats[] = JSON.parse(statsDataString) || [];
    return parsedStorageData;
  }

  function getDailyGameLogData() :DailyStats {
    const today = new Date().setHours(0 , 0, 0, 0).toString();

    const defaultDailyStats: DailyStats = {
      date: today,
      short: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory:[]}},
      medium: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory:[]}},
      long: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory:[]}}
    }

    const dailyLogString: string = localStorage.getItem("dailyGameLog") || JSON.stringify(defaultDailyStats);
    const parsedDailyData: DailyStats = JSON.parse(dailyLogString);

    if (parsedDailyData.date !== today) {
      return defaultDailyStats
    }

    return parsedDailyData;
  }

  const [dailyGameLog, setDailyGameLog] = useState(getDailyGameLogData())
  const [gameHistory, setGameHistory] = useState(getLocalGameHistoryData())
  const [inGame, setInGame] = useState(false)
  const [gameActive, setGameActive] = useState(false)
  const [guessCount, setGuessCount] = useState(0)
  const [gameTime, setGameTime] = useState(0)
  const [wordToGuess, setWordToGuess] = useState("loading")
  const [wordLengthAsArray, setWordLengthAsArray] = useState([""])
  const [gameMode, setGameMode] = useState("")

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

  function completeGame(letterHistory: string[], gameMode: string) {
    const gameStats: GameStats = {
      guessCount: guessCount,
      word: wordToGuess,
      time: gameTime,
      letterHistory: letterHistory
    }
    let currentDailyGameLog: DailyStats = dailyGameLog

    switch (gameMode) {
      case "short":
        currentDailyGameLog.short.complete =true;
        currentDailyGameLog.short.gameStats = gameStats
        break;
      case "medium":
        currentDailyGameLog.medium.complete =true;
        currentDailyGameLog.medium.gameStats = gameStats

        break;
      case "long":
        currentDailyGameLog.long.complete =true;
        currentDailyGameLog.long.gameStats = gameStats

        break;
    }
    setDailyGameLog(currentDailyGameLog)
    const dayLogString = JSON.stringify(currentDailyGameLog);
    localStorage.setItem("dailyGameLog", dayLogString);
    const updatedGameHistory = [...gameHistory];
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

  function triggerGameFor(newWord: string, gameMode: string) {
    const guessArray = createEmptyArrayForWord(newWord);
    resetGameTimer()
    resetGuessCount()
    setWordToGuess(newWord)
    setWordLengthAsArray(guessArray)
    setGameMode(gameMode)
    setInGame(true)
    setGameActive(true)
  }

  async function startUnlimitedMode() {
    const newWord = await getRandomWord();
    triggerGameFor(newWord, "unlimited");
  }

  async function shortRoundMode() {
    const newWord = await getShortDailyWord();
    triggerGameFor(newWord, "short")
  }
  async function mediumRoundMode() {
    const newWord = await getMediumDailyWord();
    triggerGameFor(newWord, "medium")
  }
  async function longRoundMode() {
    const newWord = await getLongDailyWord();
    triggerGameFor(newWord, "long")
  }


  function mainView() {
    if (!inGame) {
      return <LandingPage
          unlimitedModeAction={startUnlimitedMode}
          shortRoundAction={shortRoundMode}
          mediumRoundAction={mediumRoundMode}
          longRoundAction={longRoundMode}
          gameStats={gameHistory}
          dailyStats={dailyGameLog}
      />
    } else {
      return (
          <div className="Play">
            <CurrentGameLetterInputs
                startingGuessArray={wordLengthAsArray}
                updateGuessCount={updateGuessCount}
                currentWord={wordToGuess}
                currentGuessCount={guessCount}
                gameTime={gameTime}
                complete={completeGame}
                gameMode={gameMode}
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