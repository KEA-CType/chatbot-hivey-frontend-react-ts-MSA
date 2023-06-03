import '../../styles/modals.css';

import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({isOpen, onClose, header, children}: any) => {

    if (!isOpen) return null;

    return (
        <div className="modal-container">
            <div className="modal-content">
                <div className="modal-title-container">
                    <div className="modal-title">
                        {header}
                    </div>
                </div>

                <div className="modal-horizontal-line"></div>

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
    header: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default Modal;