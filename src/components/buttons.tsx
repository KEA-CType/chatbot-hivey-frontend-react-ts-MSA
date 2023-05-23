import React from "react";
import PropTypes from "prop-types";

const Button = ({text, onClick, className}: any) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    title: PropTypes.string,
    shape: PropTypes.string
};

export default Button;
