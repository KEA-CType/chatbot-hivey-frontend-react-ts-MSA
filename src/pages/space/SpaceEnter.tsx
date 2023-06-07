import "../../styles/enterspace.css";

import React, {useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";

import Button from "../../components/commons/buttons";
import Input from "../../components/commons/input";
import Modal from "../../components/commons/Modal";
import ChatbotForMember from "../../components/chatbot/ChatbotForMember";

import {userState, spaceState, memberIdState} from "../../commons/Atom";
import sformService from "../../apis/services/sformService";

import icLogoHivey from "../../assets/ic_logo_hivey.png";
import {validateAccessCode} from "../../utils/validationTest";
import {useNavigate} from "react-router-dom";

/**
 * 스페이스 참여 시 사용하는 입력 양식 컴포넌트
 */
const EnterSpaceComponent = () => {
    const navigate = useNavigate();

    const user = useRecoilValue(userState);
    const [space, setSpace] = useRecoilState(spaceState);
    const setMemberId = useSetRecoilState(memberIdState);

    const [accessCode, setAccessCode] = useState("");

    const [isValidAccessCode, setIsValidAccessCode] = useState(false);
    const [notValidAccessCodeMessage, setNotValidAccessCodeMessage] = useState("");

    const [isSuccess, setIsSuccess] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalMessage, setModalMessage] = useState("");

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

        if (!notValidAccessCodeMessage) {
            return;
        }

        /**
         * 스페이스 참여하기
         *
         * {
         *     "isSuccess": true,
         *     "code": 1000,
         *     "message": "요청에 성공하였습니다.",
         *     "result": {
         *         "spaceId": 1,
         *         "memberId": 2
         *     }
         * }
         */
        sformService
            .EnterSpace(user.id, accessCode)
            .then((response: any) => {

                if (response.code === 1000) {
                    const {spaceId, memberId} = response.result;

                    setMemberId(memberId);
                    setSpace({
                        id: spaceId, name: space.name
                    });

                    setModalTitle("스페이스 가입 성공");
                    setModalMessage(`가입하신 스페이스 멤버 아이디는 ${memberId}입니다.`);
                    setIsSuccess(true);

                } else {

                    setModalTitle("스페이스 가입 실패");
                    setModalMessage(response.message);
                    setIsSuccess(false);

                }

                setIsModalOpen(true);

            })
            .catch((error) => {

                console.log(error);

            });
    };

    /**
     * 참여한 스페이스로 바로 이동하도록 하는 함수
     */
    const handleEnterSpace = () => {
        navigate(`/refresh?destination=/space/member/${space.id}`, {replace: true});
    }

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
                    className={isValidAccessCode ? "space-enter-btn-active" : "space-enter-btn"}
                    text="Enter Space"
                    onClick={handleSubmit}/>

            </form>

            {/* 스페이스 참여 완료 혹은 실패 시 올라오는 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header={modalTitle}>
                <p>{modalMessage}</p>

                {isSuccess
                    ? <button className="space-enter-modal-btn" onClick={handleEnterSpace}>Enter</button>
                    : <button className="space-enter-modal-btn" onClick={() => setIsModalOpen(false)}>Close</button>}
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

            <div className="space-enter-title">Enter to special space!</div>

            <EnterSpaceComponent/>

            <ChatbotForMember/>

        </div>
    );
};

export default SpaceEnter;
