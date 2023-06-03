import '../../styles/modals.css';

import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({isOpen, onClose, title, children}: any) => {
    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-title-container">
                    <div className="modal-title">
                        {title}
                    </div>
                </div>

                <button className="close-button" onClick={onClose}>
                    X
                </button>

                {children}

            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Modal;