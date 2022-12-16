import {DayStats, GameStats} from "../types";

export function updateGamesPlayedToday(gameStats: GameStats, gameMode: string, currentGamesPlayedToday: DayStats): DayStats {
  const games = currentGamesPlayedToday;
  switch (gameMode) {
    case "short":
      games.short = {complete: true, gameStats: gameStats}
      break;
    case "medium":
      games.medium = {complete: true, gameStats: gameStats}
      break;
    case "long":
      games.long = {complete: true, gameStats: gameStats}
      break;
  }
  return games;
}

export function buildGameStats(letterHistory: string[], guessCount: number, word: string, gameTime: number) {
  const gameStats: GameStats = {
    guessCount: guessCount,
    word: word,
    time: gameTime,
    letterHistory: letterHistory
  }
  return gameStats;
}