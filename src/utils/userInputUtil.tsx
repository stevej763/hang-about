
export function isValidInput(letter: string) {
  return letter.length === 1 && letter.match(/^[A-Za-z]+$/)
}