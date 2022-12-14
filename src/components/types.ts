
export interface GameStats {
  guessCount: number;
  word: string
  time: number
  letterHistory: string[]
}

export interface DailyGames {
  threeOrFour: {}
  fiveOrSix: {}
  sevenOrEight: {}
}