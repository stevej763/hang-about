
export interface GameStats {
  guessCount: number;
  word: string
  time: number
  letterHistory: string[]
}

export interface DailyStats {
  short: {complete: boolean}
  medium: {complete: boolean}
  long: {complete: boolean}
}