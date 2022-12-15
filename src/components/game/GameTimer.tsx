import './GameTimer.css'
import FormattedTime from "../FormattedTime";

interface GameTimerProps {
  gameTime: number;
}

function GameTimer({gameTime}: GameTimerProps) {

  return <div className={"Timer"}>
    <span>Time:</span>
    <div>
      <FormattedTime time={gameTime}/>
    </div>
  </div>;
}

export default GameTimer;