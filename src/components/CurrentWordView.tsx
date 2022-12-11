import React, {KeyboardEvent, useState} from "react";
import LetterInput from "./LetterInput";
import {isBackspace, isValidInput} from "../utils/userInputUtil";
import "./CurrentWordView.css"

interface CurrentWordViewProps {
  startingGuessArray: string[]
  currentWord: string
  updateGuessCount: () => void
  complete: () => void
}

function CurrentWordView({startingGuessArray, currentWord, updateGuessCount, complete}: CurrentWordViewProps) {

  const [keyDown, setKeyDown] = useState(false)
  const [currentLettersOnPage, setCurrentLettersOnPage] = useState(startingGuessArray)

  function getInputBoxes() {
    return (
        <div className={"InputBoxes"}>
          {startingGuessArray.map((value, index) =>
              <LetterInput
                key={index}
                autoFocus={index === 0}
                index={index}
                checkInput={(event: KeyboardEvent<HTMLInputElement>, index: number) => handleUserInput(event, index)}
                changeFocus={(event: KeyboardEvent<HTMLInputElement>, index: number) => changeFocus(event, index)}
                currentCharacter={currentLettersOnPage[index]}
            />)
          }
        </div>
    )
  }

  function userGuessWasCorrect(userLetter: string, letterIndexInWord: string) {
    return userLetter.toUpperCase() === letterIndexInWord.toUpperCase();
  }

  function handleArrowKeyInput(event: KeyboardEvent<HTMLInputElement>, inputIndex: number) {
    if (event.key === "ArrowRight") {
      toNextCharacter(inputIndex)
    }
    if (event.key === "ArrowLeft") {
      toPreviousCharacter(inputIndex)
    }
  }

  function updateGuessProgress(updatedLetters: string[]) {
    setCurrentLettersOnPage(updatedLetters);
    if (updatedLetters.join("") === currentWord) {
      complete()
    }
  }

  function handleUserInput(event: KeyboardEvent<HTMLInputElement>, inputIndex: number) {
    event.preventDefault();
    let userInputKey = event.key;
    const inputElement = event.currentTarget;
    handleArrowKeyInput(event, inputIndex);
    if (!keyDown) {
      setKeyDown(true)
      let updatedLetters = [...currentLettersOnPage]
      if (isValidInput(userInputKey)) {
        updateGuessCount()
        handleLetterAddition(updatedLetters, userInputKey, inputElement);
      } else if (isBackspace(userInputKey)) {
        handleLetterDeletion(updatedLetters);
      }
    }

    function handleLetterDeletion(updatedLetters: string[]) {
      inputElement.classList.remove("letter-input-correct", "letter-input-incorrect")
      updatedLetters[inputIndex] = "";
      updateGuessProgress(updatedLetters);
    }

    function handleLetterAddition(currentLetters: string[], userInputLetter: string, currentTarget: HTMLInputElement) {
      let userLetter: string = userInputLetter.toUpperCase()
      currentLetters[inputIndex] = userLetter;
      let letterAtGuessPosition = currentWord.charAt(inputIndex);
      if (userGuessWasCorrect(userLetter, letterAtGuessPosition)) {
        currentTarget.classList.remove("letter-input-incorrect")
        currentTarget.classList.add("letter-input-correct")
      } else {
        currentTarget.classList.remove("letter-input-correct")
        currentTarget.classList.add("letter-input-incorrect")
      }
      updateGuessProgress(currentLetters)
    }
  }

  function changeFocus(event: KeyboardEvent<HTMLInputElement>, inputIndex: number) {
    event.preventDefault();

    if (keyDown) {
      const userInputLetter: string = event.key;
      if (isValidInput(userInputLetter) && userGuessWasCorrect(userInputLetter, currentWord.charAt(inputIndex))) {
        toNextCharacter(inputIndex);
      } else if (isBackspace(userInputLetter)) {
        toPreviousCharacter(inputIndex);
      }
      setKeyDown(false)
    }

  }

  function toNextCharacter(inputIndex: number) {
    let nextIndex = inputIndex + 1;
    let nextInput = document.getElementById("letterInput-" + nextIndex);
    if (nextIndex === startingGuessArray.length) {
      nextIndex = 0
      nextInput = document.getElementById("letterInput-" + nextIndex);
    }
    let isAlreadyCompleted = nextInput?.classList.contains("letter-input-correct");
    if (!isAlreadyCompleted) {
      nextInput?.focus()
    } else {
      toNextCharacter(nextIndex)
    }
  }

  function toPreviousCharacter(inputIndex: number) {
    let previousIndex = inputIndex - 1;
    let previousInput = document.getElementById("letterInput-" + previousIndex);
    if (previousIndex === -1) {
      previousIndex = startingGuessArray.length -1
      previousInput = document.getElementById("letterInput-" + previousIndex);
    }
    let isAlreadyCompleted = previousInput?.classList.contains("letter-input-correct");
    if (!isAlreadyCompleted) {
      previousInput?.focus()
    } else {
      toPreviousCharacter(previousIndex)
    }
  }

  return <div className={"CurrentGameLetters"}>
    {getInputBoxes()}
  </div>
}

export default CurrentWordView;