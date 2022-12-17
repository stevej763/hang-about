import React from "react";
import './GameOverModal.css'
import {GameStats} from "../types";
import FormattedTime from "../FormattedTime";

interface GameEndModalProps {
  isVisible: boolean;
  gameStats: GameStats;
  completeGame: () => void;
  gameMode: string
}

function GameEndModal({isVisible, completeGame, gameStats, gameMode}: GameEndModalProps) {

  function formattedGameModeText(gameMode: string) {
    switch (gameMode) {
      case "short": return "Short"
      case "medium": return "Medium"
      case "Long": return "Long"
    }
  }

  function getModal() {
    if (isVisible) {
      return <section className={"Modal"}>
        <div className={"EndGameStats"}>
          <h3 className={"SummaryModalTitle"}>Game summary</h3>
          <h2 className={"SummaryHeading"}>{formattedGameModeText(gameMode)} word of the day:</h2>
          <h1 className={"WordOfTheDayAnswer"}>{gameStats.word}</h1>
          <div className={"DataSummary"}>
            <div className={"GuessCount"}>
              <span>Guesses:</span>
              <span>{gameStats.guessCount}</span>
            </div>
            <div className={"TimeTaken"}>
              <span>Time taken: </span>
              <FormattedTime time={gameStats.time}/>
            </div>
          </div>
          <div className={"AlphabetStats"}>
          </div>
          <button autoFocus={true} onClick={completeGame} className="EndGameButton">Done</button>
        </div>
      </section>
    }
  }
  return <div>{getModal()}</div>
}

export default GameEndModal