import React, {KeyboardEvent} from "react";
import "./LetterInput.css"

interface LetterInputProps {
  autoFocus: boolean
  index: number
  checkInput: (event: KeyboardEvent<HTMLInputElement>, index: number) => void;
  changeFocus: (event: KeyboardEvent<HTMLInputElement>, index: number) => void;
  currentCharacter: string
}

function LetterInput({autoFocus, index, checkInput, changeFocus, currentCharacter}: LetterInputProps) {
  return <input
      autoCorrect={"false"}
      size={1}
      autoFocus={autoFocus}
      id={"letterInput-" + index}
      key={index}
      type={"text"}
      className={"LetterInput"}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => checkInput(event, index)}
      onKeyUp={(event: KeyboardEvent<HTMLInputElement>) => changeFocus(event, index)}
      maxLength={1}
      defaultValue={currentCharacter}
  />
}

export default  LetterInput;