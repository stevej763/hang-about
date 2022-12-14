import './HeaderLinks.css'
import HowToPlayModal from "./HowToPlayModal";

interface HeaderLinksProps {
  showHowToPlay: boolean;
  toggleModal: () => void;
}

function HeaderLinks({showHowToPlay, toggleModal}: HeaderLinksProps) {

  function howToPlayModal() {
    if (showHowToPlay) {
      return <HowToPlayModal toggle={toggleModal}/>
    }
  }

  return <div className={"HeaderLinks"}>
    <span className={"HeaderSpacer"}> | </span>
    <a className={"HeaderLink"}
       target={"_blank"}
       rel="noreferrer"
       onClick={toggleModal}> How to play</a>
    <span className={"HeaderSpacer"}> | </span>
    <a
        className={"HeaderLink"}
        target={"_blank"}
        rel="noreferrer"
        href={process.env.REACT_APP_BUY_ME_A_COFFEE}>Buy me a coffee</a>
    <span className={"HeaderSpacer"}> | </span>
    {howToPlayModal()}
  </div>
}

export default HeaderLinks;