import StartButton from "./StartButton";
import "./GameModeButtons.css"

interface GameModeButtonsProps {
  shortRoundAction: () => void;
  dailyShortRoundCompleted: boolean
  mediumRoundAction: () => void;
  dailyMediumRoundCompleted: boolean
  longRoundAction: () => void;
  dailyLongRoundCompleted: boolean

}

function GameModeButtons({shortRoundAction, mediumRoundAction, longRoundAction,
                           dailyShortRoundCompleted, dailyMediumRoundCompleted, dailyLongRoundCompleted}: GameModeButtonsProps) {
  return <div className={"GameModeButtons"}>
    <StartButton startGame={shortRoundAction} isDisabled={dailyShortRoundCompleted} text={"Short"}/>
    <StartButton startGame={mediumRoundAction} isDisabled={dailyMediumRoundCompleted} text={"Medium"}/>
    <StartButton startGame={longRoundAction} isDisabled={dailyLongRoundCompleted} text={"Long"}/>
  </div>
}

export default GameModeButtons;