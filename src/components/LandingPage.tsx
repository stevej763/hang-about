import "./LandingPage.css"
import React from "react";
import {GameStats} from "./types";
import GameStatsTable from "./GameStatsTable";

interface LandingPageProps {
  startGameAction: () => void;
  gameStats: GameStats[]
}

function LandingPage({startGameAction, gameStats}: LandingPageProps) {

  function displayWipInfo() {
    if (process.env.REACT_APP_WIP) {
      return <div className={"WorkInProgress"}>
        <p>Hi there, welcome to HangAbout, a fun little project I have been working on in my free time.</p>
        <p>If you are reading this it is because the game is still a work in progress and I am actively fixing bugs and adding functionality.</p>
        <p>Feel free to drop me an email <a href={"mailto:steve@hangabout.io"}>steve@hangabout.io</a> if you find a bug or want to request a feature.</p>
      </div>
    }
  }

  return (
      <div className={"LandingPage"}>
        <button className={"PlayButton"} onClick={startGameAction} autoFocus={true}>PLAY</button>
        {<GameStatsTable gameStats={gameStats}/>}
        {displayWipInfo()}
      </div>
  )
}

export default LandingPage