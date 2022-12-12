import React from "react";
import './GameOverModal.css'
import {GameStats} from "./types";
import alphabet from "../utils/Alphabet";

interface GameEndModalProps {
  isVisible: boolean;
  gameStats: GameStats;
  completeGame: () => void;
}

function GameEndModal({isVisible, completeGame, gameStats}: GameEndModalProps) {

  function getLetterCountFor(letter: string) {
    let count = 0;
    gameStats.letterHistory.forEach(guess => guess === letter ? count++ : null)
    return <td>{count}</td>;
  }

  function printLetterHeadings() {
    return alphabet.map(letter => <th>{letter}</th>)
  }

  function printLetterCounts() {
    return alphabet.map(letter => getLetterCountFor(letter))
  }

  function getModal() {
    if (isVisible) {
      return <section className={"Modal"}>
        <div className={"EndGameStats"}>
          <h2>TODAY'S WORD: {gameStats.word}</h2>
          <p className={"GuessCount"}>GUESS COUNT: {gameStats.guessCount}</p>
          <p className={"TimeTaken"}>TIME TAKEN: {gameStats.time}</p>
          <table>
            <thead>
              <tr>
                {printLetterHeadings()}
              </tr>
            </thead>
            <tbody>
            <tr>
              {printLetterCounts()}
            </tr>
            </tbody>
          </table>
          <button onClick={completeGame} className="EndGameButton">Done</button>
        </div>
      </section>
    }
    return <span/>

  }

  return getModal()
}

export default GameEndModal