import "../styles/mainpage.css";

import React from "react";
import Button from "../components/commons/buttons";
import Chatbot from "../components/chatbot/chatbot";

import {Link} from "react-router-dom";

const Main = () => {
    return (
        <div className="mainpage">
            <p className="text">왼쪽 메뉴에서 스페이스를 선택하세요.</p>
            <div className="ButtonWrapper">
                <Link to="/space/create">
                    <Button className="main-button" text="Create Space"/>
                </Link>
                <Link to="/space/enter">
                    <Button className="main-button" text="Enter Space"/>
                </Link>
            </div>
            <Chatbot/>
        </div>
    );
};

export default Main;
