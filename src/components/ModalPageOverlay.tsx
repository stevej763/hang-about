import './ModalPageOverlay.css'

interface ModalPageOverlayProps {
  isVisible: boolean
}

function ModalPageOverlay({isVisible}: ModalPageOverlayProps) {
  return <div className={`ModalOverlay ${isVisible ? "" : "HideModal"}`}></div>
}

export default ModalPageOverlay