import "./LandingPage.css"
import React, {useEffect, useState} from "react";
import {DayStats, GameHistory, GameStats} from "../types";
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

  function resetSharedTextOnTimer() {
    const interval = setInterval(() => {
      setTextCopied(false)
    }, 3000);
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


  function spacing(length: string) {
    switch (length) {
      case "Short" : return "%20%20%20%20%20%20";
      case "Medium" : return "%20";
      case "Long" : return "%20%20%20%20%20%20%20";
    }
  }

  function createUrlEncodedWordRow(stats: GameStats, length: string) {
    const seconds = ("0" + Math.floor(stats.time / 1000) % 60).slice(-2).toString() + "." + ("0" + (stats.time / 10) % 1000).slice(-2).toString();
    return `${length + spacing(length)}%20%7C%20${seconds}%20Seconds%2C%20${stats.guessCount}%20guesses`;
  }

  function createWordRowForClipboard(stats: GameStats, wordLength: string) {
    const seconds = ("0" + Math.floor(stats.time / 1000) % 60).slice(-2).toString() + "." + ("0" + (stats.time / 10) % 1000).slice(-2).toString();
    return `${wordLength} | ${stats.guessCount} | ${seconds}`
        ;
  }

  function createSharableString(urlEncode: boolean): string {
    const short = dayStats.short.gameStats;
    const medium = dayStats.medium.gameStats;
    const long = dayStats.long.gameStats;
    if (urlEncode) {
      return (
          `${createUrlEncodedWordRow(short, "Short")}%0A` +
          `${createUrlEncodedWordRow(medium, "Medium")}%0A` +
           `${createUrlEncodedWordRow(long, "Long")}`);
    }
    return `${createWordRowForClipboard(short, "Short")}\n${createWordRowForClipboard(medium, "Medium")}\n${createWordRowForClipboard(long, "Long")}`;
  }

  function copySharableStatsToClipboard() {
    const userAgent = navigator.userAgent;
    const testTextForClipboard: string = createSharableString(false)
    if (userAgent.match(/iP(ad|hone)/i)) {
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
        <TweetButton shareString={createSharableString(true)}/>
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