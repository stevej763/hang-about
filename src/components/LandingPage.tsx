import "./LandingPage.css"
import React from "react";
import {GameStats} from "./types";
import GameStatsTable from "./GameStatsTable";

interface LandingPageProps {
  startGameAction: () => void;
  gameStats: GameStats[]
}

function LandingPage({startGameAction, gameStats}: LandingPageProps) {

  return (
      <div className={"LandingPage"}>
        <button className={"PlayButton"} onClick={startGameAction} autoFocus={true}>PLAY</button>

        {<GameStatsTable gameStats={gameStats}/>}
      </div>
  )
}

export default LandingPage