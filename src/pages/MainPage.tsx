import "../styles/mainpage.css";

import React from "react";
import Button from "../components/buttons";
import Chatbot from "../components/chatbot/chatbot";

import {Link} from "react-router-dom";

const MainPage = () => {
    return (
        <div className="mainpage">
            <p className="text">스페이스를 선택하세요</p>
            <div className="ButtonWrapper">
                <Link to="/createSpace">
                    <Button className="main-button" text="Create Space"/>
                </Link>
                <Link to="/enterSpace">
                    <Button className="main-button" text="Enter Space"/>
                </Link>
            </div>
            <Chatbot/>
        </div>
    );
};


export default MainPage;
