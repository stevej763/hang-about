import "./GuessCounter.css"

interface GuessCounterProps {
  guesses: number
}

function GuessCounter({guesses}: GuessCounterProps) {
  return <div className={"GuessCounter"}>
    <span>Guess Count:</span>
    <span>{guesses}</span>
  </div>
}

export default GuessCounter;