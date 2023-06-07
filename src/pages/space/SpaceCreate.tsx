import "../../styles/createspace.css";

import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";

import {userState, spaceState} from "../../commons/Atom";

import Button from "../../components/commons/buttons";
import Input from "../../components/commons/input";
import Modal from "../../components/commons/Modal";
import ChatbotForMember from "../../components/chatbot/ChatbotForMember";

import icLogoHivey from "../../assets/ic_logo_hivey.png";
import imgSampleWhite from "../../assets/img_sample_white.png";

import uploadImgService from "../../apis/services/uploadFileService";
import sformService from "../../apis/services/sformService";
import {validateSpaceName} from "../../utils/validationTest";
import {m} from "framer-motion";

/**
 * 스페이스 생성 시 사용하는 입력 양식 컴포넌트
 */
const CreateSpaceComponent = () => {
    const navigate = useNavigate();

    const user = useRecoilValue(userState);
    const [space, setSpace] = useRecoilState(spaceState);

    const [spaceImgUrl, setSpaceImgUrl] = useState("");
    const [spaceName, setSpaceName] = useState("");
    const [membership, setMembership] = useState("");

    const [isValidName, setIsValidName] = useState(false);
    const [notValidNameMessage, setNotValidNameMessage] = useState("");
    const [isValidMembership, setIsValidMembership] = useState(false);
    const [isValidAll, setIsValidAll] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [message, setMessage] = useState("");
    const [accessCode, setAccessCode] = useState("");

    /**
     * 스페이스 이미지 업로드 업데이트
     */
    useEffect(() => {

        console.log(`spaceImgUrl: ${spaceImgUrl}`);

    }, [spaceImgUrl])

    /**
     * 스페이스 멤버십 버튼 클릭 효과
     */
    useEffect(() => {

        if (membership !== "") {
            setIsValidMembership(true);
        } else {
            setIsValidMembership(false);
        }

    }, [membership])

    /**
     * 입력한 값이 유효한지를 확인한 후 버튼 활성화 여부를 결정한다.
     */
    useEffect(() => {

        if (isValidName && isValidMembership) {
            setIsValidAll(true);
        } else {
            setIsValidAll(false);
        }

    }, [isValidName, isValidMembership])

    /**
     * 하위 컴포넌트로부터 설정한 이미지 URL을 가져온다.
     */
    const getSpaceImgUrl = (imgUrl: string) => {
        setSpaceImgUrl(imgUrl);
    }

    /**
     * 스페이스의 이름 작성에 대한 이벤트 함수
     */
    const handleSpaceNameChange = (e: any) => {
        const value = e.target.value;
        setSpaceName(value);

        setIsValidName(validateSpaceName(value));

        if (!isValidName) {
            setNotValidNameMessage("Please write 4 to 20 characters including korean, english, and sform.");
        } else {
            setNotValidNameMessage("");
        }
    };

    /**
     * 스페이스 멤버십을 선택하는 버튼에 대한 클릭 이벤트 함수
     */
    const onClickMembershipButton = (e: any, selectedMembership: string) => {
        e.preventDefault();

        setMembership(selectedMembership);
    }

    /**
     * 스페이스 생성에 대한 이벤트 함수
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        /**
         * 스페이스 생성하기
         * {
         *     "isSuccess": true,
         *     "code": 1000,
         *     "message": "요청에 성공하였습니다.",
         *     "result": {
         *         "spaceId": 1,
         *         "accessCode": "2cG1ScrcVy"
         *     }
         * }
         */
        sformService
            .CreateSpace(user.id, spaceName, spaceImgUrl)
            .then((response) => {

                const {spaceId, accessCode, memberId} = response.result;

                setSpace({id: spaceId, name: spaceName});
                setAccessCode(accessCode);

                // 생성이 완료되면 완료되었다는 메시지와 함께 스페이스의 access code를 띄워준다.
                setIsModalOpen(true);
                setModalHeader("스페이스 생성 성공");
                setMessage(`참여 코드: ${accessCode}`);

            })
            .catch((error) => {

                console.log(error);

                setIsModalOpen(true);
                setModalHeader("스페이스 생성 실패");
                setMessage("스페이스 생성에 실패하였습니다.");

            });
    };

    /**
     * 생성한 스페이스 초대 코드를 복사할 수 있도록 한다.
     */
    const handleCopyClipBoard = () => {
        try {
            console.log(`accessCode: ${accessCode}`);
            navigator.clipboard.writeText(accessCode).then(r => {
                alert("클립보드에 복사되었습니다.");
                // navigate(`/refresh?destination=/space/leader/${space.id}`, {replace: true});
                navigate("/main");
            });
        } catch (error) {
            alert("클립보드 복사에 실패하였습니다.");
        }
    };

    /**
     * 스페이스 커버 이미지를 장치 관리자로부터 받아와 저장하는 함수
     */
    const handlePreviewImgOnChange = (e: any) => {
        e.preventDefault();

        uploadImgService(e)
            .then((response) => {
                console.log(`response: ${JSON.stringify(response)}`);

                if (response.data.success) {

                    const file = `${process.env.PUBLIC_URL}/images/${response.data.fileName}`;
                    console.log(`file: ${file}`);

                    setSpaceImgUrl(file);
                    getSpaceImgUrl(file);

                } else {
                    throw new Error("이미지 업로드에 실패하였습니다.");
                }

            });
    }

    /**
     * 등록한 이미지를 삭제하는 함수
     */
    const handlePreviewImgOnDelete = (e: any) => {
        e.preventDefault();

        if (spaceImgUrl !== "") {
            // 이미지 URL을 무효화시킨다.
            URL.revokeObjectURL(spaceImgUrl);

            // 이미지 URL을 먼저 빈 문자열로 설정한다.
            setSpaceImgUrl("");
        }
    }

    return (
        <div className="create-space-container">

            {/* 스페이스 이름과 옵션(멤버십)을 지정하는 부분 */}
            <form encType="multipart/form-data" className="create-space-form-container" onSubmit={handleSubmit}>

                <div className="create-space-img-container">

                    <img id="space-preview-img"
                         className="create-space-preview-img"
                         src={spaceImgUrl ? spaceImgUrl : imgSampleWhite}
                         alt=""/>

                    <div className="create-space-img-btn-container">

                        {/* Upload 버튼(<label></label>)을 누르면 장치 관리자 창이 열리도록 한다. */}

                        <label htmlFor="create-space-img-upload-btn"
                               className="create-space-img-upload-btn">Upload</label>

                        {/* 아래 <input> 요소가 위의 label htmlFor=""을 통해 위의 label로 연결된다. 따라서 아래 <input> 요소는 보이지 않도록 처리한다. */}
                        <input
                            id="create-space-img-upload-btn"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={handlePreviewImgOnChange}
                            key={spaceImgUrl}
                            style={{display: "none"}}
                        />

                        {/* 업로드한 이미지를 삭제한다. */}
                        <button className="create-space-img-remove-btn" onClick={handlePreviewImgOnDelete}>
                            Remove
                        </button>

                    </div>

                </div>

                {/* 스페이스 이름 입력 */}
                <div className="create-space-input-name-container">

                    Space name

                    <Input
                        className="create-space-input-name"
                        placeholder="Enter your space name"
                        value={spaceName}
                        onChange={handleSpaceNameChange}/>

                    {!isValidName &&
                        <div className="error-message">{notValidNameMessage}</div>}

                </div>

                {/* 스페이스 멤버십 선택 */}
                <div className="create-space-input-membership-container">

                    Space membership

                    <div className="create-space-membership-btn-container">

                        <button
                            className={membership === "F" ? "create-space-membership-btn-clicked" : "create-space-membership-btn"}
                            onClick={(e) => onClickMembershipButton(e, "F")}>
                            Free (up to 50 members)
                        </button>

                        <button
                            className={membership === "P" ? "create-space-membership-btn-clicked" : "create-space-membership-btn"}
                            onClick={(e) => onClickMembershipButton(e, "P")}>
                            Premium (no limits)
                        </button>

                    </div>

                </div>

                {/* 스페이스 생성 버튼 */}
                <Button
                    className={isValidAll ? "create-space-btn-active" : "create-space-btn"}
                    text="Create a space"
                    onClick={handleSubmit}/>

            </form>

            {/* 스페이스 생성 완료 혹은 실패 시 올라오는 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header={modalHeader}>
                {message}
                <button className="create-space-copy-btn" onClick={handleCopyClipBoard}>Copy</button>
            </Modal>

        </div>
    );
};

/**
 * 스페이스 생성 페이지 컴포넌트
 */
const SpaceCreate = () => {
    return (
        <div className="create-space-rectangle-white">

            <img className="create-space-logo" src={icLogoHivey} alt=""/>

            <div className="create-space-title">Create your own space!</div>

            <CreateSpaceComponent/>

            <ChatbotForMember/>

        </div>
    );
};

export default SpaceCreate;
