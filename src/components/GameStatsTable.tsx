import React from "react";
import {GameStats} from "./types";
import "./GameStatsTable.css"

interface GameStatsTableProps {
  gameStats: GameStats[]
}

function GameStatsTable({gameStats}: GameStatsTableProps) {

  function createRow(game: GameStats, gameNumber: number) {
    return <tr key={gameNumber}>
      <td>{gameNumber}</td>
      <td>{game.word}</td>
      <td>{game.guessCount}</td>
    </tr>

  }

  function getTable() {
    if (gameStats.length === 0) {
      return <p>Play a game to see your stats here</p>
    }
    return (
        <table className={"StatsTable"}>
          <thead>
          <tr>
            <th>Game Number</th>
            <th>Word</th>
            <th>Guesses</th>
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