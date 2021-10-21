import PropTypes from 'prop-types'; 
import './styles.css';

function Modal({ children, onModalClose }) {
  return (
    <div className="modal">
      <button className="modal-close-action" onClick={onModalClose}>X</button>
      {children}
    </div>
  )
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

Modal.defaultProps = {};

export default Modal;

