import {DayStats, GameHistory, GameStats} from "../components/types";

export function getLocalGameHistoryData() {
  const statsDataString = localStorage.getItem("gameHistory") || "[]";
  const parsedStorageData: GameHistory[] = JSON.parse(statsDataString) || [];
  return parsedStorageData;
}

export function getLocalGamesPlayedToday(): DayStats {
  const todayDateString = new Date().setHours(0, 0, 0, 0).toString();
  const emptyDayStats = createEmptyDayStats(todayDateString);

  const dayStats = parseStatsForCurrentDay(todayDateString, emptyDayStats);

  if (dayStats.date !== todayDateString) {
    return emptyDayStats
  }
  return dayStats;
}

export function updateLetterHistory(letterHistory: string[]) {
    const letterHistoryString = localStorage.getItem("letterHistory");
    if (letterHistoryString !== null) {
    const letterHistoryArray = JSON.parse(letterHistoryString);
      const updatedLetterHistory = [...letterHistoryArray, ...letterHistory]
      localStorage.setItem("letterHistory", JSON.stringify(updatedLetterHistory));

    } else {
      localStorage.setItem("letterHistory", JSON.stringify(letterHistory));
    }
}

function createEmptyDayStats(today: string) {
  const emptyDayStats: DayStats = {
    date: today,
    short: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory: []}},
    medium: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory: []}},
    long: {complete: false, gameStats: {guessCount: 0, word: "", time: 0, letterHistory: []}}
  }
  return emptyDayStats;
}

function parseStatsForCurrentDay(today: string, emptyDayStats: DayStats) {
  const dailyLogString: string | null = localStorage.getItem("today")

  if (dailyLogString === null) {
    return emptyDayStats
  } else {
    return JSON.parse(dailyLogString);
  }
}
