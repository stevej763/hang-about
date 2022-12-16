import React from "react";
import {GameHistory, GameStats} from "../types";
import "./GameStatsTable.css"
import FormattedTime from "../FormattedTime";

interface GameStatsTableProps {
  gameHistory: GameHistory[]
}

function GameStatsTable({gameHistory}: GameStatsTableProps) {

  function createRow(day: GameHistory, dayNumber: number) {


    function calculateScore(game: GameStats) {
      const baseScore: number = parseInt(process.env.REACT_APP_BASE_SCORE || "100")
      const wordLength = game.word.length;
      let gameTimeSeconds = game.time / 1000;
      const gameTimePenalty = Math.floor(gameTimeSeconds > 100 ? 100 : gameTimeSeconds);
      const guessCountPenalty = Math.floor((game.guessCount / wordLength));

      const totalPenaltyPoints = gameTimePenalty + guessCountPenalty;

      return baseScore - totalPenaltyPoints
    }

    return day.games.map(game => {
      return (
          <tr>
            {day.games[0] === game ? <td rowSpan={3}>{new Date(parseInt(day.date)).toLocaleDateString()}</td> : null}
            <td>{game.word}</td>
            <td>{game.guessCount}</td>
            <td><FormattedTime time={game.time} /></td>
            <td>{calculateScore(game)}</td>
          </tr>)
    })
  }

  function getTable() {
    if (gameHistory.length === 0) {
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
          {gameHistory.slice().reverse().map((game: GameHistory, index: number) => createRow(game, gameHistory.length - index))}
          </tbody>
        </table>
    );
  }

  return getTable()

}

export default GameStatsTable;