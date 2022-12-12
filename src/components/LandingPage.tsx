import "./LandingPage.css"
import React, {useState} from "react";
import {GameStats} from "./types";
import GameStatsTable from "./GameStatsTable";
import HeaderLinks from "./HeaderLinks";
import ModalPageOverlay from "./ModalPageOverlay";

interface LandingPageProps {
  startGameAction: () => void;
  gameStats: GameStats[]
}

function LandingPage({startGameAction, gameStats}: LandingPageProps) {

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  function handleHowToPlayModel() {
    setShowHowToPlay(!showHowToPlay)
  }

  function displayWipInfo() {
    if (process.env.REACT_APP_WIP) {
      return <div className={"WorkInProgress"}>
        <p>Hi there, welcome to HangAbout, a fun little project I have been working on in my free time.</p>
        <p>If you are reading this it is because the game is still a work in progress and I am actively fixing bugs and
          adding functionality. The site may also randomly break as I test changes so please forgive any issues.</p>
        <p>Feel free to drop me an email <a href={"mailto:steve@hangabout.io"}>steve@hangabout.io</a> if you find a bug
          or want to request a feature.</p>
      </div>
    }
  }

  return (
      <div className={"LandingPage"}>
        <HeaderLinks
            showHowToPlay={showHowToPlay}
            toggleModal={() => handleHowToPlayModel()}
        />
        <ModalPageOverlay isVisible={showHowToPlay}/>
        <button
            className={"StartButton"}
            tabIndex={0}
            onClick={startGameAction}
            autoFocus={true}>
            <h2 className={"StartText"}>START</h2>
        </button>
        {<GameStatsTable gameStats={gameStats}/>}
        {displayWipInfo()}
      </div>
  )
}

export default LandingPage