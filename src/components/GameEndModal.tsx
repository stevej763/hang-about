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
          <h3>GAME SUMMARY FOR TODAY'S WORD:</h3>
          <h1>{gameStats.word}</h1>
          <div className={"DataSummary"}>
            <div className={"GuessCount"}>
              <span>Letters guessed:</span>
              <span>{gameStats.guessCount}</span>
            </div>
            <div className={"TimeTaken"}>
              <span>Time taken(s): </span>
              <span>{gameStats.time}</span>
            </div>
          </div>
          <div className={"AlphabetStats"}>
            <table className={"AlphabetTable"}>
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
          </div>
          <button onClick={completeGame} className="EndGameButton">Done</button>
        </div>
      </section>
    }
    return <span/>

  }

  return getModal()
}

export default GameEndModal