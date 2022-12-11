
export function isValidInput(letter: string) {
  return letter.length === 1 && letter.match(/^[A-Za-z]+$/)
}


export function isBackspace(inputCharCode: string) {
  return inputCharCode === "Backspace";
}