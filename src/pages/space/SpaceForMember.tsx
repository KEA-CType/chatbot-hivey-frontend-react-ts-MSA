/**
 * 멤버(구성원)용 메인 스페이스 화면
 */

import "../../styles/space.css";

import React, {useState, useEffect} from "react";
import Chatbot from "../../components/chatbot/chatbot";
import {useRecoilValue} from "recoil";
import {spaceState, userState} from "../../commons/Atom";
import spaces from "../../services/space/space";

const SpaceForMember = () => {
    const [currentSpace, setCurrentSpace] = useState("");

    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    useEffect(() => {

        spaces
            .GetSpace(user.id, space.id)
            .then((response) => {

                if (response) {
                    setCurrentSpace(response.result);
                } else {
                    alert("스페이스 조회에 실패하였습니다.");
                }

            });

    },);

    return (
        <div className="participant-page">

            <div className="survey-container">
                <div className="space-name">
                    {/*<h1>{currentSpace.name}</h1>*/}
                </div>
                <div>
                </div>
            </div>

            <Chatbot/>
        </div>
    );
};

export default SpaceForMember;
