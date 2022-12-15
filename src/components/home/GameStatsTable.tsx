import React from "react";
import {GameStats} from "../types";
import "./GameStatsTable.css"
import FormattedTime from "../FormattedTime";

interface GameStatsTableProps {
  gameStats: GameStats[]
}

function GameStatsTable({gameStats}: GameStatsTableProps) {

  function createRow(game: GameStats, gameNumber: number) {

    function calculateScore(game: GameStats) {
      const baseScore: number = parseInt(process.env.REACT_APP_BASE_SCORE || "100")
      const wordLength = game.word.length;
      let gameTimeSeconds = game.time / 1000;
      const gameTimePenalty = Math.floor(gameTimeSeconds > 100 ? 100 : gameTimeSeconds);
      const guessCountPenalty = Math.floor((game.guessCount / wordLength));

      const totalPenaltyPoints = gameTimePenalty + guessCountPenalty;

      return <td>{baseScore - totalPenaltyPoints}</td>
    }

    return <tr key={gameNumber}>
      <td>{gameNumber}</td>
      <td>{game.word}</td>
      <td>{game.guessCount}</td>
      <td><FormattedTime time={game.time} /></td>
      {calculateScore(game)}
    </tr>

  }

  function getTable() {
    if (gameStats.length === 0) {
      return <p className={"NoGamesPlayed"}>Play a game to see your stats here</p>
    }
    return (
        <table className={"StatsTable"}>
          <thead>
          <tr>
            <th>Date</th>
            <th>Word</th>
            <th>Guess Count</th>
            <th>Time</th>
            <th>Score</th>
          </tr>
          </thead>
          <tbody>
          {gameStats.slice().reverse().map((game: GameStats, index: number) => createRow(game, gameStats.length - index))}
          </tbody>
        </table>
    );
  }

  return getTable()

}

export default GameStatsTable;