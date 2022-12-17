import React from "react";
import {GameHistory, GameStats} from "../types";
import "./GameStatsTable.css"
import FormattedTime from "../FormattedTime";

interface GameStatsTableProps {
  gameHistory: GameHistory[]
}

function GameStatsTable({gameHistory}: GameStatsTableProps) {

  function createRow(day: GameHistory) {

    function calculateScore(game: GameStats) {
      const baseScore: number = parseInt(process.env.REACT_APP_BASE_SCORE || "100")
      const wordLength = game.word.length;
      let gameTimeSeconds = game.time / 1000;
      const gameTimePenalty = Math.floor(gameTimeSeconds > 100 ? 100 : gameTimeSeconds);
      const guessCountPenalty = Math.floor((game.guessCount / wordLength));

      const totalPenaltyPoints = gameTimePenalty + guessCountPenalty;

      return baseScore - totalPenaltyPoints
    }

    const gameOne = day.games[0];
    const gameTwo = day.games[1];
    const gameThree = day.games[2];

    const emptyRow =
        <tr>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>

    function generateRowForRound(game: GameStats, addDate: boolean) {
      const dateRow = addDate ? <td rowSpan={3}>{new Date(parseInt(day.date)).toLocaleDateString()}</td>: null;
      return <tr>
        {dateRow}
        <td>{game.word}</td>
        <td>{game.guessCount}</td>
        <td><FormattedTime time={game.time}/></td>
        <td>{calculateScore(game)}</td>
      </tr>;
    }

    const gameOneRow = generateRowForRound(gameOne, true);
    const gameTwoRow = gameTwo != null ? generateRowForRound(gameTwo, false) : emptyRow
    const gameThreeRow = gameThree != null ? generateRowForRound(gameThree, false) : emptyRow

    return [gameOneRow, gameTwoRow, gameThreeRow];
  }

  function getTable() {
    if (gameHistory.length === 0) {
      return <p className={"NoGamesPlayed"}>Play a game to see your latest stats here</p>
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
          {gameHistory.slice().reverse().map((game: GameHistory) => createRow(game))}
          </tbody>
        </table>
    );
  }
  return getTable()

}

export default GameStatsTable;