import "./GuessCounter.css"

interface GuessCounterProps {
  guesses: number
}

function GuessCounter({guesses}: GuessCounterProps) {
  return <div className={"GuessCounter"}>{guesses}</div>
}

export default GuessCounter;