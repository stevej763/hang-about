import React from "react";
import './HowToPlayModal.css'

interface HowToPlayModelProps {
  toggle: () => void
}

function HowToPlayModal({toggle} : HowToPlayModelProps) {
  return <section className={"Modal"}>
    <div className={"CloseModal"}>
      <button className={"ModalExitButton"} onClick={() => toggle()}>X</button>
    </div>

    <div>
      <h3>How to play</h3>
      <p>Like hangman, but harder</p>
      <div className={"HowToPlayContent"}>
        <ul className={"InstructionsList"}>
          <li><strong>Guess the word as fast as possible with the fewest mistakes!</strong></li>
          <li>Type in letters to start guessing the word</li>
          <li>The faster you guess the word, the more points you score</li>
          <li>The more letters you guess incorrectly, the lower your score</li>
        </ul>
      </div>
    </div>
  </section>
}

export default HowToPlayModal;