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
    <StartButton startGame={shortRoundAction} isDisabled={dailyShortRoundCompleted}/>
    <StartButton startGame={mediumRoundAction} isDisabled={dailyMediumRoundCompleted}/>
    <StartButton startGame={longRoundAction} isDisabled={dailyLongRoundCompleted}/>
  </div>
}

export default GameModeButtons;