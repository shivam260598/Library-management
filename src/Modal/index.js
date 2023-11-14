import React from 'react';
import './styles.css';

function Modal(props) {
    const { isOpen, closeModal, children } = props;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div>{children}</div>
                <button onClick={closeModal} className="modal_button">CLOSE</button>
            </div>
        </div>
    );
}

export default Modal;
