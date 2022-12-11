
export async function randomWord(): Promise<string> {
  console.log(process.env.REACT_APP_ENVIRONMENT)
  if (process.env.REACT_APP_ENVIRONMENT === "production") {
    const input: string = process.env.REACT_APP_LAMBDA_ENDPOINT || "broken";
    return await fetch(input)
        .then(response => response.json())
        .then(response => {
          console.log(response.word)
          return response.word
        })
  }
    console.log("dev mode using local word bank")
    return testWords.at(Math.floor(Math.random() * testWords.length))?.toUpperCase() || "DEFAULT";
}

export function createEmptyArrayForWord(word: string): string[] {

  const guessArray = [];
  for (let index = 0;  index < word.length; index ++) {
    guessArray.push("")
  }
  return guessArray;
}

const testWords = [
  "THE", "FOUR", "CREAM", "COFFEE", "PRESENT"

]
