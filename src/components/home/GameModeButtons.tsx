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
    <StartButton startGame={shortRoundAction} isDisabled={dailyShortRoundCompleted} text={"Short word"}/>
    <StartButton startGame={mediumRoundAction} isDisabled={dailyMediumRoundCompleted} text={"Medium word"}/>
    <StartButton startGame={longRoundAction} isDisabled={dailyLongRoundCompleted} text={"Long word"}/>
  </div>
}

export default GameModeButtons;