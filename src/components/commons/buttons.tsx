import React from "react";
import PropTypes from "prop-types";

const Button = ({text, onClick, className, isDisabled}: any) => {
    return (
        <button
            className={className}
            onClick={onClick}
            disabled={isDisabled}>
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    title: PropTypes.string,
    shape: PropTypes.string,
    isDisabled: PropTypes.bool
};

export default Button;
