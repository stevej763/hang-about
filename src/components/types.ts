
export interface GameStats {
  guessCount: number;
  word: string
  time: number
  letterHistory: string[]
}

export interface DayStats {
  date: string
  short: {complete: boolean, gameStats: GameStats}
  medium: {complete: boolean, gameStats: GameStats}
  long: {complete: boolean, gameStats: GameStats}
}

export interface GameHistory {
  date: string;
  games: GameStats[]

}