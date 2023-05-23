import React from "react";

const MarkComponent = ({match}: any) => {
    let imageSrc = "";

    switch (match) {
        case 0:
            imageSrc = "ic_check_circle_gray.png";
            break;
        case 1:
            imageSrc = "ic_check_circle_green.png";
            break;
        case -1:
            imageSrc = "ic_check_circle_red.png";
            break;
        default:
            break;
    }

    return (
        <div>
            <img src={imageSrc} alt="Mark"/>
        </div>
    );
};

export default MarkComponent;
