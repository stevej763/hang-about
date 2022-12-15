import React, {KeyboardEvent, useState} from "react";
import LetterInput from "./LetterInput";
import {isValidInput} from "../utils/userInputUtil";
import "./CurrentWordView.css"
import GameEndModal from "./GameEndModal";
import ModalPageOverlay from "./ModalPageOverlay";

interface CurrentWordViewProps {
  startingGuessArray: string[]
  currentWord: string
  updateGuessCount: () => void
  currentGuessCount: number
  gameTime: number
  complete: (allLetters: string[]) => void
  stopGameTimer: () => void
}

export default function CurrentWordView({startingGuessArray, currentWord, currentGuessCount, gameTime, updateGuessCount, complete, stopGameTimer}: CurrentWordViewProps) {

  const emptyLetterHistory: string[] = [];
  const [keyDown, setKeyDown] = useState(false);
  const [currentLettersOnPage, setCurrentLettersOnPage] = useState(startingGuessArray);
  const [letterHistory, setLetterHistory] = useState(emptyLetterHistory);
  const [gameOver, setGameOver] = useState(false);

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

  function handleArrowKeyInput(userInputKey: string, inputIndex: number) {
    if (userInputKey === "ARROWRIGHT") {
      toNextCharacter(inputIndex)
    }
    if (userInputKey === "ARROWLEFT") {
      toPreviousCharacter(inputIndex)
    }
  }

  function showEndGameModal() {
    setGameOver(true)
    stopGameTimer()
  }

  function updateLetterHistory(userInputKey: string) {
    const updatedLetters = [...letterHistory];
    updatedLetters.push(userInputKey);
    setLetterHistory(updatedLetters)
  }

  function handleUserInput(event: KeyboardEvent<HTMLInputElement>, inputIndex: number) {
    event.preventDefault();
    const normalisedUserInput = event.key.toUpperCase();
    const inputElement = event.currentTarget;
    handleArrowKeyInput(normalisedUserInput, inputIndex);
    if (!keyDown) {
      setKeyDown(true)
      let currentLetters = [...currentLettersOnPage]
      if (isValidInput(normalisedUserInput)) {
        updateLetterHistory(normalisedUserInput)
        updateGuessCount()
        handleLetterAddition(currentLetters, normalisedUserInput, inputElement);
      }
    }

    function handleLetterAddition(currentLetters: string[], userInputLetter: string, currentTarget: HTMLInputElement) {
      currentLetters[inputIndex] = userInputLetter;
      let letterAtGuessPosition = currentWord.charAt(inputIndex);
      if (userGuessWasCorrect(userInputLetter, letterAtGuessPosition)) {
        currentTarget.classList.remove("letter-input-incorrect")
        currentTarget.classList.add("letter-input-correct")
      } else {
        currentTarget.classList.remove("letter-input-correct")
        currentTarget.classList.add("letter-input-incorrect")
      }
      updateGuessProgress(currentLetters, currentTarget)
    }
  }

  function updateGuessProgress(updatedLetters: string[], currentTarget: HTMLInputElement) {
    setCurrentLettersOnPage(updatedLetters);
    if (updatedLetters.join("") === currentWord) {
      currentTarget.blur()
      showEndGameModal()
    }
  }

  function changeFocus(event: KeyboardEvent<HTMLInputElement>, inputIndex: number) {
    event.preventDefault();
    if (keyDown) {
      const userInputLetter: string = event.key.toUpperCase();
      if (isValidInput(userInputLetter) && userGuessWasCorrect(userInputLetter, currentWord.charAt(inputIndex))) {
        toNextCharacter(inputIndex);
      }
      setKeyDown(false)
    }

  }

  function toNextCharacter(inputIndex: number) {
    if (!gameOver) {
      let nextIndex = inputIndex + 1;
      let nextInputPageElement = document.getElementById("letterInput-" + nextIndex);
      if (nextIndex === startingGuessArray.length) {
        nextIndex = 0
        nextInputPageElement = document.getElementById("letterInput-" + nextIndex);
      }
      const isAlreadyCompleted = nextInputPageElement?.classList.contains("letter-input-correct");
      if (!isAlreadyCompleted) {
        nextInputPageElement?.focus()
      } else {
        toNextCharacter(nextIndex)
      }
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
    <GameEndModal isVisible={gameOver}
                  completeGame={() => complete(letterHistory)}
                  gameStats={ {letterHistory: letterHistory, guessCount: currentGuessCount, word: currentWord, time: gameTime} }/>
    <ModalPageOverlay isVisible={gameOver}/>
    {getInputBoxes()}
  </div>
}