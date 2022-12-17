import "./LandingPage.css"
import React, {useEffect, useState} from "react";
import {DayStats, GameHistory} from "../types";
import GameStatsTable from "./GameStatsTable";
import HeaderLinks from "./HeaderLinks";
import ModalPageOverlay from "../ModalPageOverlay";
import GameModeButtons from "./GameModeButtons"
import StartButton from "./StartButton";
import DailyChallengeHeading from "./DailyChallengeHeading";
import TweetButton from "./TweetButton";

interface LandingPageProps {
  unlimitedModeAction: () => void;
  shortRoundAction: () => void
  mediumRoundAction: () => void
  longRoundAction: () => void
  gameHistory: GameHistory[]
  dayStats: DayStats
}

function LandingPage(
    {
      unlimitedModeAction,
      shortRoundAction,
      mediumRoundAction,
      longRoundAction,
      gameHistory,
      dayStats
    }: LandingPageProps) {

  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [textCopied, setTextCopied] = useState(false);
  const [test, setTest] = useState("test ext");

  function resetSharedTextOnTimer() {
    const interval = setInterval(() => {
      setTextCopied(false)
    }, 2000);
    return () => clearInterval(interval);
  }

  useEffect(() => {
    if (textCopied) {
      resetSharedTextOnTimer();
    }
  }, [textCopied]);

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
      return <StartButton startGame={unlimitedModeAction} isDisabled={false} text={"Start"}/>
    }
    if (dailyChallengesAreComplete()) {
      return
    }
    return <GameModeButtons
        shortRoundAction={shortRoundAction}
        mediumRoundAction={mediumRoundAction}
        longRoundAction={longRoundAction}
        dailyShortRoundCompleted={dayStats.short.complete}
        dailyMediumRoundCompleted={dayStats.medium.complete}
        dailyLongRoundCompleted={dayStats.long.complete}
    />
  }

  function dailyChallengesAreComplete() {
    return dayStats.short.complete && dayStats.medium.complete && dayStats.long.complete;
  }

  function copySharableStatsToClipboard() {
    const userAgent = navigator.userAgent;
    const testTextForClipboard = "Test copy to clipboard";
    setTest("on desktop")
    if (userAgent.match(/iP(ad|hone)/i)) {
      setTest("on ios")
      const clipboardItem = new ClipboardItem({
        'text/plain': new Promise(async (resolve) => {
          resolve(new Blob([testTextForClipboard]))
        }),
      })
      navigator.clipboard.write([clipboardItem])
          .then(() => setTextCopied(true))
    } else {
      navigator.clipboard.writeText(testTextForClipboard)
          .then(() => setTextCopied(true))
    }
  }

  function getShareButtons() {
    if (dailyChallengesAreComplete()) {
      const shareText = textCopied ? "Copied!" : "Share"
      return <div className={"ShareButtons"}>
        <button className={"ShareStatsButton"} onClick={() => copySharableStatsToClipboard()}>{shareText}</button>
        <p>{test}</p>
        <TweetButton/>
      </div>
    }
  }

  return (
      <div className={"LandingPage"}>
        <ModalPageOverlay isVisible={showHowToPlay}/>
        <HeaderLinks showHowToPlay={showHowToPlay} toggleModal={handleHowToPlayModel}/>
        <DailyChallengeHeading allComplete={dailyChallengesAreComplete()}/>
        {getShareButtons()}
        {getGameStartButtons()}
        <GameStatsTable gameHistory={gameHistory}/>
        {displayWipInfo()}
      </div>
  )
}

export default LandingPage