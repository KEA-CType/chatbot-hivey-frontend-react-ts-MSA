import React, {useEffect, useState} from "react";

import "../../styles/usersetting.css";

import Input from "../../components/commons/input";
import Button from "../../components/commons/buttons";
import Modal from "../../components/commons/Modal";
import ChatbotForMember from "../../components/chatbot/ChatbotForMember";

import imgSampleWhite from "../../assets/img_sample_white.png";
import {useRecoilState, useRecoilValue} from "recoil";
import {userInfoState, userState} from "../../commons/Atom";
import uploadImgService from "../../apis/services/uploadFileService";
import userService from "../../apis/services/userService";

import {motion} from "framer-motion";

const UserSettingComponent = () => {
    const user = useRecoilValue(userState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const [userProfileUrl, setUserProfileUrl] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [isValidName, setIsValidName] = useState(false);
    const [notValidNameMessage, setNotValidNameMessage] = useState(""); // 이메일 형식이 잘못되었을 때 출력할 경고 문구

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {

        setUserProfileUrl(userInfo.img);

    }, [userInfo.img]);

    /**
     * 스페이스 이미지 업로드 업데이트
     */
    useEffect(() => {

        console.log(`userProfileUrl: ${userProfileUrl}`);

    }, [userProfileUrl]);

    /**
     * 하위 컴포넌트로부터 설정한 이미지 URL을 가져온다.
     */
    const getUserProfileUrl = (imgUrl: string) => {
        setUserProfileUrl(imgUrl);
    }

    /**
     * 사용자 이름 작성에 대한 이벤트 함수
     */
    const handleNameChange = (e: any) => {
        const value = e.target.value;
        setName(value);

        setIsValidName(true);
    };

    const handleEmailChange = (e: any) => {
        const value = e.target.value;
        setEmail(value);
    }

    /**
     * 스페이스 생성에 대한 이벤트 함수
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        userService
            .GetUserInformation(user.id)
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });
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

                    setUserProfileUrl(file);
                    getUserProfileUrl(file);

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

        if (userProfileUrl !== "") {
            // 이미지 URL을 무효화시킨다.
            URL.revokeObjectURL(userProfileUrl);

            // 이미지 URL을 먼저 빈 문자열로 설정한다.
            setUserProfileUrl("");
        }
    }

    return (
        <div className="user-setting-content-container">

            <div className="user-setting-content-title">
                User Information
            </div>

            {/* 스페이스 이름과 옵션(멤버십)을 지정하는 부분 */}
            <form encType="multipart/form-data" className="user-setting-form-container" onSubmit={handleSubmit}>

                <div className="user-setting-img-container">

                    <img id="user-preview-img"
                         className="user-setting-preview-img"
                         src={userProfileUrl ? userProfileUrl : imgSampleWhite}
                         alt=""/>

                    <div className="user-setting-img-btn-container">

                        {/* Upload 버튼(<label></label>)을 누르면 장치 관리자 창이 열리도록 한다. */}

                        <label htmlFor="user-setting-img-upload-btn"
                               className="user-setting-img-upload-btn">Upload</label>

                        {/* 아래 <input> 요소가 위의 label htmlFor=""을 통해 위의 label로 연결된다. 따라서 아래 <input> 요소는 보이지 않도록 처리한다. */}
                        <input
                            id="user-setting-img-upload-btn"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={handlePreviewImgOnChange}
                            key={userProfileUrl}
                            style={{display: "none"}}
                        />

                        {/* 업로드한 이미지를 삭제한다. */}
                        <button className="user-setting-img-remove-btn" onClick={handlePreviewImgOnDelete}>
                            Remove
                        </button>

                    </div>

                </div>

                {/* 이름 입력 */}
                <div className="user-setting-input-name-container">

                    Name

                    <Input
                        className="create-space-input-name"
                        placeholder={`${userInfo.name}`}
                        value={name}
                        onChange={handleNameChange}
                        isReadOnly={false}/>

                </div>

                {/* 이메일 입력 */}
                <div className="user-setting-input-name-container">

                    Email address

                    <Input
                        className="create-space-input-name"
                        placeholder={`${user.email}`}
                        value={email}
                        onChange={handleEmailChange}
                        isReadOnly={true}/>

                </div>

                {/* 스페이스 생성 버튼 */}
                <Button
                    className={(isValidName) ? "user-setting-btn-active" : "user-setting-btn"}
                    text="Save changes"
                    onClick={handleSubmit}/>

            </form>

            {/* 스페이스 생성 완료 혹은 실패 시 올라오는 모달 */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header={modalHeader}>
                {modalMessage}
            </Modal>

        </div>
    );
}

/**
 * User setting page component
 */
const UserSetting = () => {

    return (
        <div className="user-setting-container">
            <motion.div className="user-setting-title-rectangle-white" style={{y: 100}} animate={{y: 0}}>
                <div className="user-setting-title">Personal Information</div>
            </motion.div>

            <motion.div className="user-setting-rectangle-white" style={{y: 100}} animate={{y: 0}}>
                <UserSettingComponent/>
            </motion.div>

            <ChatbotForMember/>
        </div>
    );

}

export default UserSetting;
