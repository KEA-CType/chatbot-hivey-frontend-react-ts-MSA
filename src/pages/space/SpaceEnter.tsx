import "../../styles/enterspace.css";

import React, {useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {Link} from "react-router-dom";

import Button from "../../components/commons/buttons";
import Input from "../../components/commons/input";
import Modal from "../../components/commons/Modal";
import ChatbotForMember from "../../components/chatbot/ChatbotForMember";

import {userState, spaceState, memberIdState} from "../../commons/Atom";
import spaceService from "../../services/space/space";

import icLogoHivey from "../../assets/ic_logo_hivey.png";
import {validateAccessCode} from "../../utils/validationTest";

/**
 * 스페이스 참여 시 사용하는 입력 양식 컴포넌트
 */
const EnterSpaceComponent = () => {
    const user = useRecoilValue(userState);
    const [space, setSpace] = useRecoilState(spaceState);
    const [memberId, setMemberId] = useRecoilState(memberIdState);

    const [accessCode, setAccessCode] = useState("");

    const [isValidAccessCode, setIsValidAccessCode] = useState(false);
    const [notValidAccessCodeMessage, setNotValidAccessCodeMessage] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    /**
     * 스페이스 참여 코드를 입력할 때 호출되는 함수
     */
    const handleCodeChange = (e: any) => {
        const inputValue = e.target.value;
        setAccessCode(inputValue);

        setIsValidAccessCode(validateAccessCode(inputValue));

        if (!isValidAccessCode) {
            setNotValidAccessCodeMessage("The access code should be 10 to 50 characters including only english and number");
        } else {
            setNotValidAccessCodeMessage("");
        }
    };

    /**
     * 스페이스 참여 버튼 클릭 시 호출되는 함수
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (notValidAccessCodeMessage) {
            return;
        }

        spaceService
            .EnterSpace(user.id, accessCode)
            .then((response: any) => {

                const {memberId, spaceId} = response.result;
                setMemberId(memberId);
                setSpace({
                    id: spaceId, name: space.name
                });

                setIsModalOpen(true);
                setMessage(`스페이스 가입이 완료되었습니다.`);

            })
            .catch((error) => {

                console.log(error);

                setIsModalOpen(true);
                setMessage("스페이스 가입에 실패하였습니다.");

            });
    };

    return (
        <div className="space-enter-container">

            <form className="space-enter-form-container" onSubmit={handleSubmit}>

                {/* 스페이스 참여 코드 입력 */}
                <div className="space-enter-input-access-code-container">

                    Space access code

                    <Input
                        className="space-enter-input-access-code"
                        type="text"
                        placeholder="Enter the space access code you want"
                        value={accessCode}
                        onChange={handleCodeChange}/>

                    {!isValidAccessCode &&
                        <div className="error-message">{notValidAccessCodeMessage}</div>}

                </div>

                {/* 스페이스 참여 버튼 */}
                <Button
                    className="space-enter-btn"
                    text="Enter Space"
                    onClick={handleSubmit}/>

            </form>

            {/* 스페이스 참여 완료 혹은 실패 시 올라오는 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={message}>
                <p>가입하신 스페이스 멤버 아이디는 #{memberId}입니다.</p>
                <Link to="/space/">
                    <Button className="enterSpace-button" text="Enter"/>
                </Link>
            </Modal>

        </div>
    );
};

/**
 * 스페이스 참여 페이지 컴포넌트
 */
const SpaceEnter = () => {
    return (
        <div className="space-enter-rectangle-white">

            <img className="space-enter-logo" src={icLogoHivey} alt=""/>

            <div className="title">Enter to special space!</div>

            <EnterSpaceComponent/>

            <ChatbotForMember/>

        </div>
    );
};

export default SpaceEnter;
