import './GameTimer.css'

interface GameTimerProps {
  gameTime: number;
}

function GameTimer({gameTime} : GameTimerProps) {

  return <div className={"Timer"}>
    <span>Time:</span><span>{gameTime}</span>
  </div>;
}

export default GameTimer;