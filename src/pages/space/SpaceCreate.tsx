import "../../styles/createspace.css";

import React, {useState} from "react";

import Button from "../../components/buttons";
import Chatbot from "../../components/chatbot/chatbot";
import Input from "../../components/input";
import Modal from "../../components/modals";
import {userState, spaceState} from "../../commons/Atom";
import {useRecoilState} from "recoil";

import spaces from "../../services/space/space";

const CreateSpaceComponent = () => {
    const [img, setImg] = useState("");
    const [spaceName, setSpaceName] = useState("");
    const [nameError, setNameError] = useState(""); // 이름이 중복될 때 출력할 경고문구
    const [invitation, setInvitation] = useState("");
    const [invitationError, setInvitationError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [accessCode, setAccessCode] = useState("");

    // Recoil
    const [user, setUser] = useRecoilState(userState);
    const [space, setSpace] = useRecoilState(spaceState);

    /**
     * 스페이스의 이름 작성에 대한 이벤트 함수
     */
    const handleSpaceNameChange = (e: any) => {
        const inputSpaceName = e.target.value;
        setSpaceName(inputSpaceName);
    };

    /**
     * 스페이스 초대에 대한 이벤트 함수
     */
    const handleInvitationsChange = (e: any) => {
        const inputInvitations = e.target.value;
        setInvitation(inputInvitations);
    };

    /**
     * 스페이스 생성에 대한 이벤트 함수
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        // 일단 프로토타입에서는 img를 null로 초기화한다.
        setImg("null");

        if (nameError) {
            return;
        }

        // handle login submit
        spaces
            .CreateSpace(user.id, spaceName, img)
            .then((response) => {
                const {code, message} = response;
                console.log(`response: ${JSON.stringify(response)}`);

                const {spaceId, accessCode} = response.result;

                if (code === 1000) {
                    setIsModalOpen(true);
                    setMessage(accessCode);
                    setAccessCode(accessCode);
                    setSpace({id: spaceId, name: spaceName});
                    // handle login success
                } else if (code === 2020) {
                    setIsModalOpen(true);
                    setMessage(message);
                    // handle login failure
                }
            })
            .catch((error) => {
                console.log(error);
                setIsModalOpen(true);
                setMessage("스페이스 생성에 실패하였습니다.");
            });
    };

    /**
     * 생성한 스페이스 초대 코드를 복사할 수 있도록 한다.
     */
    const handleCopyClipBoard = (text: string) => {
        try {
            navigator.clipboard.writeText(text);
            alert("클립보드에 복사되었습니다.");
        } catch (error) {
            alert("클립보드 복사에 실패하였습니다.");
        }
    };

    /**
     * View
     */
    return (
        <div className="createSpace-container">
            <form className="create-space" onSubmit={handleSubmit}>
                <div className="title">Create Space</div>
                <div className="space-input">
                    Space Name :
                    <Input
                        className="create-space-input"
                        placeholder="My Space"
                        value={spaceName}
                        onChange={handleSpaceNameChange}
                    />
                </div>
                <div className="space-input">
                    Space Invite :
                    <Input
                        className="create-space-input"
                        placeholder="user email"
                        value={invitation}
                        onChange={handleInvitationsChange}
                    />
                </div>

                <Button text="Create Space" className="create-space-btn"/>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p>{message}</p>
                <button onClick={() => handleCopyClipBoard(message)}>Copy</button>
            </Modal>
            <Chatbot/>
        </div>
    );
};

const SpaceCreate = () => {
    return (
        <div className="createpage">
            <CreateSpaceComponent/>
        </div>
    );
};

export default SpaceCreate;
