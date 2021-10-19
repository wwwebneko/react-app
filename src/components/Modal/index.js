import './styles.css';

export default function Modal({ children, onModalClose }) {
  return (
    <div className="modal">
      <button className="modal-close-action" onClick={onModalClose}>X</button>
      {children}
    </div>
  )
}