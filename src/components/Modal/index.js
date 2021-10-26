import PropTypes from 'prop-types'; 
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Modal({ children, onModalClose }) {
  return (
    <div className={styles.modal}>
      <span aria-hidden={true} onClick={onModalClose} className={styles.modalCancelCurtain}></span>
      <div className={styles.modalBody}>
        <button className={styles.modalCloseAction} onClick={onModalClose}>
          <FontAwesomeIcon icon={faTimes} size="2x"/>
        </button>
      {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.node
}

Modal.defaultProps = {};

export default Modal;

