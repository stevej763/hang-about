
export function createEmptyArrayForWord(word: string): string[] {

  const guessArray = [];
  for (let index = 0;  index < word.length; index ++) {
    guessArray.push("")
  }
  return guessArray;
}

export const testWords = [
  "THE", "FOUR", "CREAM", "COFFEE", "PRESENT"
]
