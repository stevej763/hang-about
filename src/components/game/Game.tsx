import "./Game.css"
import React, {useEffect, useState} from "react";
import {DayStats, GameHistory, GameStats} from "../types";
import {createEmptyArrayForWord} from "../../utils/wordGeneratorUtil";
import {getLongDailyWord, getMediumDailyWord, getRandomWord, getShortDailyWord} from "../../api/DailyWords";
import GuessCounter from "./GuessCounter";
import CurrentGameLetterInputs from "./CurrentGameLetterInputs";
import LandingPage from "../home/LandingPage";
import GameTimer from "./GameTimer";
import {buildGameStats, updateGamesPlayedToday} from "./StatsMapper";
import {getLocalGameHistoryData, getLocalGamesPlayedToday, updateLetterHistory} from "../../utils/localStorageUtils";

function Game() {

  const [gamesPlayedToday, setGamesPlayedToday] = useState(getLocalGamesPlayedToday())
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

  function updateDailyGamesPlayed(gameStats: GameStats) {
    const updatedGamesPlayedToday: DayStats = updateGamesPlayedToday(gameStats, gameMode, gamesPlayedToday);
    localStorage.setItem("today", JSON.stringify(updatedGamesPlayedToday));
    setGamesPlayedToday(updatedGamesPlayedToday)
  }

  function getDatedGameHistory() {
    const currentGameHistoryString = localStorage.getItem("gameHistory");
    if (currentGameHistoryString !== null) {
      const currentGameHistory: GameHistory[] = JSON.parse(currentGameHistoryString);

      return [...currentGameHistory];
    } else {
      return [];
    }
  }

  function addGameToCurrentDayStats(datedGameStat: GameHistory, todayDateString: string, gameStats: GameStats) {
    if (datedGameStat.date === todayDateString) datedGameStat.games.push(gameStats)
    return
  }

  function updateExistingGameHistory(currentGameHistory: GameHistory[], todayDateString: string, datedGameStats: GameHistory, gameStats: GameStats) {
    let noGamesToday = true;
    currentGameHistory.forEach(gameStats => {if (gameStats.date === todayDateString) noGamesToday = false})
    if (noGamesToday) {
      currentGameHistory.push(datedGameStats)
    } else {
      currentGameHistory.map(datedGameStat => addGameToCurrentDayStats(datedGameStat, todayDateString, gameStats));
    }
    localStorage.setItem("gameHistory", JSON.stringify(currentGameHistory));
  }

  function updateGameHistory(gameStats: GameStats) {
    const todayDateString = new Date().setHours(0, 0, 0, 0).toString();
    const currentGameHistory: GameHistory[] = getDatedGameHistory();

    const datedGameStats: GameHistory = {date: todayDateString, games: [gameStats]}
    const isFirstTimePlaying = currentGameHistory.length === 0;
    if (isFirstTimePlaying) {
      const gameHistoryArray: GameHistory[] = [datedGameStats];
      localStorage.setItem("gameHistory", JSON.stringify(gameHistoryArray));
    } else {
      updateExistingGameHistory(currentGameHistory, todayDateString, datedGameStats, gameStats);
    }

    setGameHistory(currentGameHistory);
  }

  function completeGame(letterHistory: string[]) {

    const gameStats = buildGameStats(letterHistory, guessCount, wordToGuess, gameTime);

    updateDailyGamesPlayed(gameStats);
    updateLetterHistory(gameStats.letterHistory)
    updateGameHistory(gameStats);

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
          gameHistory={gameHistory}
          dayStats={gamesPlayedToday}
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