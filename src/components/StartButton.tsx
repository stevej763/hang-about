import './StartButton.css'

interface StartButtonProps {
  startGame: () => void
}

function StartButton({startGame} : StartButtonProps) {

  function buttonText() {
    return "Start >"
  }

  return <button
      disabled={false}
      tabIndex={0}
      className={"StartButton"}
      onClick={startGame}
      autoFocus={true}>
    <h2 className={"StartText"}>{buttonText()}</h2>
  </button>
}

export default StartButton