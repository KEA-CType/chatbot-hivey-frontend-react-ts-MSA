import React from "react";
import PropTypes from "prop-types";

const Input = ({type, placeholder, value, onChange, isValid, errorMessage, className}: any) => {
    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
            />
            {!isValid !== null && (
                <div style={{color: 'red', fontSize: '12px'}}>{errorMessage}</div>
            )}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    height: PropTypes.number,        // 'is not assignable to type 'IntrinsicAttributes' 에러 해결을 위해 추가
    onChange: PropTypes.func,
    isValid: PropTypes.bool,         // 검증 결과
    errorMessage: PropTypes.string,  // 경고 문구
    className: PropTypes.string      // add className prop type
};

export default Input;
