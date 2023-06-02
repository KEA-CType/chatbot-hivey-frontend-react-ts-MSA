import "../styles/main.css";

import React from "react";
import Button from "../components/commons/buttons";

import {Link} from "react-router-dom";
import ChatbotForMember from "../components/chatbot/ChatbotForMember";

const Main = () => {

    return (
        <div className="main-rectangle-white">

            <div className="main-description">왼쪽 메뉴에서 스페이스를 선택해 주세요.</div>

            <div className="main-button-container">

                <Link to="/space/create">
                    <Button className="main-button" text="Create Space"/>
                </Link>

                <Link to="/space/enter">
                    <Button className="main-button" text="Enter Space"/>
                </Link>

            </div>

            <ChatbotForMember/>

        </div>
    );
};

export default Main;
