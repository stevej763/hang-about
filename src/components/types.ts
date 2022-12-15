
export interface GameStats {
  guessCount: number;
  word: string
  time: number
  letterHistory: string[]
}

export interface DailyStats {
  date: string
  short: {complete: boolean, gameStats: GameStats}
  medium: {complete: boolean, gameStats: GameStats}
  long: {complete: boolean, gameStats: GameStats}
}