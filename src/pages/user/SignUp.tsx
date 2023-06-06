import "../../styles/register.css";

import React, {useEffect, useState} from "react";
import Button from "../../components/commons/buttons";
import Input from "../../components/commons/input";
import logo from "../../assets/ic_logo_hivey.png";
import Modal from "../../components/commons/Modal";
import authService from "../../services/user/auth";
import {useNavigate} from "react-router-dom";
import {validateEmail} from "../../utils/validationTest";

import {motion} from "framer-motion";
import imgSampleWhite from "../../assets/img_sample_white.png";
import uploadImgService from "../../services/file/uploadFileService";

const SignUp = () => {
    const navigate = useNavigate();

    const [profileImg, setProfileImg] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [notValidEmailMessage, setNotValidEmailMessage] = useState("");
    const [isValidName, setIsValidName] = useState(false);
    const [notValidNameMessage, setNotValidNameMessage] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [notValidPasswordMessage, setNotValidPasswordMessage] = useState("");
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);
    const [notValidConfirmPasswordMessage, setNotValidConfirmPasswordMessage] = useState("");
    const [isValidAll, setIsValidAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {

        if (isValidEmail && isValidName && isValidPassword && isValidConfirmPassword) {
            setIsValidAll(true);
        } else {
            setIsValidAll(false);
        }

    }, [isValidEmail, isValidName, isValidPassword, isValidConfirmPassword]);

    /**
     * 이메일을 입력받을 때 사용한다.
     */
    const handleEmailChange = (e: any) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        setIsValidEmail(validateEmail(inputEmail));

        if (!isValidEmail) {
            setNotValidEmailMessage("Please enter a valid email");
        } else {
            setNotValidEmailMessage("");
        }
    };

    /**
     * 이름을 입력받을 때 사용한다.
     */
    const handleUserNameChange = (e: any) => {
        const inputUserName = e.target.value;
        setName(inputUserName);

        if (inputUserName === "") {
            setIsValidName(false);
            setNotValidNameMessage("Please enter a name");
        } else {
            setIsValidName(true);
            setNotValidNameMessage("");
        }
    };

    /**
     * 비밀번호를 입력받을 때 사용한다.
     */
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);

        if (confirmPassword && e.target.value !== confirmPassword) {
            setIsValidPassword(false);
            setNotValidPasswordMessage("Passwords do not match");
        } else {
            setIsValidPassword(true);
            setNotValidPasswordMessage("");
        }
    };

    /**
     * 검사를 위해 비밀번호를 한 번 더 입력받을 때 사용한다.
     */
    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);

        if (password && e.target.value !== password) {
            setIsValidConfirmPassword(false);
            setNotValidConfirmPasswordMessage("Passwords do not match");
        } else {
            setIsValidConfirmPassword(true);
            setNotValidConfirmPasswordMessage("");
        }
    };

    /**
     * 이메일과 비밀번호를 입력한 후 회원가입 버튼을 클릭했을 때 사용한다.
     */
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (notValidEmailMessage || notValidNameMessage || notValidPasswordMessage || notValidConfirmPasswordMessage) {
            return;
        }

        authService
            .Register(email, name, password)
            .then((response) => {
                const {isSuccess, message} = response;

                if (isSuccess) {

                    setIsModalOpen(true);
                    setModalHeader("회원 가입 성공");
                    setModalMessage("회원 가입이 완료되었습니다.\n5초 후에 자동으로 로그인 페이지로 이동합니다.");

                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/login");
                    }, 5000);

                } else {

                    setProfileImg("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");

                }
            })
            .catch((error) => {
                setIsModalOpen(true);
                setModalHeader("회원 가입 실패");
                setModalMessage("회원 가입에 실패했습니다.");
            });
    };

    /**
     * 프로필 이미지를 장치 관리자로부터 받아와 저장하는 함수
     */
    const handlePreviewImgOnChange = (e: any) => {
        e.preventDefault();

        uploadImgService(e)
            .then((response) => {
                console.log(`response: ${JSON.stringify(response)}`);

                if (response.data.success) {

                    const file = `${process.env.PUBLIC_URL}/images/${response.data.fileName}`;
                    console.log(`file: ${file}`);
                    setProfileImg(file);

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

        if (profileImg !== "") {
            // 이미지 URL을 무효화시킨다.
            URL.revokeObjectURL(profileImg);

            // 이미지 URL을 먼저 빈 문자열로 설정한다.
            setProfileImg("");
        }
    }

    /**
     * View
     */
    return (
        <motion.div className="register-container" style={{y: 100}} animate={{y: 0}}>
            <div className="register-box">
                <img className="register-logo" src={logo} alt="Logo"/>
                <div className="logo-ment">Create an account</div>
                <div className="register-ment">Already have an account? <a href="/user/Login">Log in</a></div>

                <form encType="multipart/form-data" className="register-form" onSubmit={handleSubmit}>

                    <div className="register-img-container">

                        <img id="register-preview-img"
                             className="register-preview-img"
                             src={profileImg ? profileImg : imgSampleWhite}
                             alt=""/>

                        <div className="register-img-btn-container">

                            {/* Upload 버튼(<label></label>)을 누르면 장치 관리자 창이 열리도록 한다. */}

                            <label htmlFor="register-img-upload-btn"
                                   className="register-img-upload-btn">Upload</label>

                            {/* 아래 <input> 요소가 위의 label htmlFor=""을 통해 위의 label로 연결된다. 따라서 아래 <input> 요소는 보이지 않도록 처리한다. */}
                            <input
                                id="register-img-upload-btn"
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={handlePreviewImgOnChange}
                                key={profileImg}
                                style={{display: "none"}}
                            />

                            {/* 업로드한 이미지를 삭제한다. */}
                            <button className="register-img-remove-btn" onClick={handlePreviewImgOnDelete}>
                                Remove
                            </button>

                        </div>

                    </div>

                    {/* Name */}

                    <p className="register-input">Name</p>

                    <Input
                        type="userName"
                        placeholder="Enter your profile name"
                        value={name}
                        onChange={handleUserNameChange}
                        isValid={isValidName}
                        errorMessage={notValidNameMessage}
                        className="register_inputs"/>

                    {/* Email */}

                    <p className="register-input">Email address</p>

                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        isValid={isValidEmail}
                        errorMessage={notValidEmailMessage}
                        className="register_inputs"/>

                    {/* Password */}

                    <p className="register-input">Password</p>

                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        isValid={isValidPassword}
                        errorMessage={notValidPasswordMessage}
                        className="register_inputs"/>

                    <p className="password-content">Use 8 or more characters with a mix of letters, numbers &
                        symbols</p>

                    {/* Confirm password */}

                    <p className="register-input">Confirm Password</p>

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        isValid={isValidConfirmPassword}
                        errorMessage={notValidConfirmPasswordMessage}
                        className="register_inputs"/>

                    <div style={{margin: "16px 0"}}></div>

                    {/* Button */}

                    <Button
                        className={isValidAll ? "register-form-button-active" : "register-form-button"}
                        text="Create an account"
                        shape="rounded"/>

                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                header={modalHeader}>

                <p>{modalMessage}</p>

            </Modal>
        </motion.div>
    );
};

export default SignUp;
