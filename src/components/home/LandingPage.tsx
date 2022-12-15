import "./LandingPage.css"
import React, {useState} from "react";
import {DailyStats, GameStats} from "../types";
import GameStatsTable from "./GameStatsTable";
import HeaderLinks from "./HeaderLinks";
import ModalPageOverlay from "../ModalPageOverlay";
import GameModeButtons from "./GameModeButtons"
import StartButton from "./StartButton";

interface LandingPageProps {
  unlimitedModeAction: () => void;
  shortRoundAction: () => void
  mediumRoundAction: () => void
  longRoundAction: () => void
  gameStats: GameStats[]
  dailyStats: DailyStats
}

function LandingPage(
    {
      unlimitedModeAction,
      shortRoundAction,
      mediumRoundAction,
      longRoundAction,
      gameStats,
      dailyStats
    }: LandingPageProps) {

  const [showHowToPlay, setShowHowToPlay] = useState(false);

  function handleHowToPlayModel() {
    setShowHowToPlay(!showHowToPlay)
  }

  function displayWipInfo() {
    if (process.env.REACT_APP_WIP) {
      return <div className={"WorkInProgress"}>
        <p>Hi there, welcome to Hang About, a fun little project I have been working on in my free time.</p>
        <p>If you are reading this it is because the game is still a work in progress and I am actively fixing bugs and
          adding functionality. The site may also randomly break as I test changes so please forgive any issues.</p>
        <p>Feel free to drop me an email <a href={"mailto:steve@hangabout.io"}>steve@hangabout.io</a> if you find a bug
          or want to request a feature.</p>
      </div>
    }
  }

  function getGameStartButtons() {
    if (process.env.REACT_APP_UNLIMITED_MODE === "true") {
      return <StartButton startGame={unlimitedModeAction} isDisabled={false}/>
    }
    return <GameModeButtons
        shortRoundAction={shortRoundAction}
        mediumRoundAction={mediumRoundAction}
        longRoundAction={longRoundAction}
        dailyShortRoundCompleted={dailyStats.short.complete}
        dailyMediumRoundCompleted={dailyStats.medium.complete}
        dailyLongRoundCompleted={dailyStats.long.complete}
    />
  }

  return (
      <div className={"LandingPage"}>
        <HeaderLinks showHowToPlay={showHowToPlay} toggleModal={handleHowToPlayModel}/>
        <ModalPageOverlay isVisible={showHowToPlay}/>
        {getGameStartButtons()}
        <GameStatsTable gameStats={gameStats}/>
        {displayWipInfo()}
      </div>
  )
}

export default LandingPage