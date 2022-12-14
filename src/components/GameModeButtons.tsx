import StartButton from "./StartButton";
import "./GameModeButtons.css"

interface GameModeButtonsProps {
  shortRoundAction: () => void;
  mediumRoundAction: () => void;
  longRoundAction: () => void;
}

function GameModeButtons({shortRoundAction, mediumRoundAction, longRoundAction}: GameModeButtonsProps) {
  return <div className={"GameModeButtons"}>
    <StartButton startGame={shortRoundAction}/>
    <StartButton startGame={mediumRoundAction}/>
    <StartButton startGame={longRoundAction}/>
  </div>
}

export default GameModeButtons;