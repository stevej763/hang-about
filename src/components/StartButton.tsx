import './StartButton.css'

interface StartButtonProps {
  startGame: () => void
  isDisabled: boolean
}

function StartButton({startGame, isDisabled} : StartButtonProps) {

  function buttonText() {
    if (isDisabled) {
      return "Complete"
    }
    return <span>Start <span className={"ButtonArrow"}>&#62;</span></span>
  }

  return <button
      disabled={isDisabled}
      tabIndex={0}
      className={`StartButton ${isDisabled ? "Disabled" : ""}`}
      onClick={startGame}
      autoFocus={false}>
    <h2 className={"StartText"}>{buttonText()}</h2>
  </button>
}

export default StartButton