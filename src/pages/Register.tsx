import "../styles/register.css";

import React, {useState} from "react";
import Button from "../components/buttons";
import Input from "../components/input";
import logo from "../assets/ic_logo_hivey.png";
import Modal from "../components/modals";
import auth from "../services/user/auth";
import {useNavigate} from "react-router-dom";
import {validateEmail} from "../utils/validateEmail";

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    /**
     * 이메일을 입력받을 때 사용한다.
     */
    const handleEmailChange = (e: any) => {
        const inputEmail = e.target.value;
        setEmail(inputEmail);

        const isValidEmail = validateEmail(inputEmail);
        if (!isValidEmail) {
            setEmailError("Please enter a valid email");
        } else {
            setEmailError("");
        }
    };

    /**
     * 이름을 입력받을 때 사용한다.
     */
    const handleUserNameChange = (e: any) => {
        const inputUserName = e.target.value;
        setUserName(inputUserName);

        if (inputUserName === "") {
            setUserNameError("Please enter a name");
        } else {
            setUserNameError("");
        }
    };

    /**
     * 비밀번호를 입력받을 때 사용한다.
     */
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
        if (confirmPassword && e.target.value !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    /**
     * 검사를 위해 비밀번호를 한 번 더 입력받을 때 사용한다.
     */
    const handleConfirmPasswordChange = (e: any) => {
        setConfirmPassword(e.target.value);
        if (password && e.target.value !== password) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }
    };

    /**
     * 이메일과 비밀번호를 입력한 후 회원가입 버튼을 클릭했을 때 사용한다.
     */
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (emailError || userNameError || passwordError || confirmPasswordError) {
            return;
        }

        console.log("email", email, "name", userName, "password", password);

        auth
            .Register(email, userName, password)
            .then((response) => {
                console.log(response);

                const {isSuccess, message} = response;

                setMessage(message);
                setIsModalOpen(true);

                if (isSuccess) {
                    setMessage(
                        "요청이 성공했습니다. \n5초 후에 자동으로 로그인 페이지로 이동합니다."
                    );
                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/login");
                    }, 5000);
                } else {
                    // handle register failure
                    // empty input so user can rewrite the input
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                }
            })
            .catch((error) => {
                console.log(error);
                setMessage("회원 가입에 실패했습니다.");
                setIsModalOpen(true);
            });
    };

    /**
     * View
     */
    return (
        <div className="register-container">
            <div className="register-box">
                <img className="register-logo" src={logo} alt="Logo"/>
                <div className="logo-ment">Create an account</div>
                <div className="register-ment">Already have an account? <a href="/login">Log in</a></div>
                <form className="register-form" onSubmit={handleSubmit}>
                    <p className="register-input">Name</p>
                    <Input
                        type="userName"
                        placeholder="Enter your profile name"
                        value={userName}
                        onChange={handleUserNameChange}
                        isValid={!userNameError}
                        errorMessage={userNameError}
                        className="register_inputs"
                    />
                    <p className="register-input">Email address</p>
                    <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        isValid={!emailError}
                        errorMessage={emailError}
                        className="register_inputs"
                    />
                    <p className="register-input">Password</p>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={handlePasswordChange}
                        isValid={!passwordError}
                        errorMessage={passwordError}
                        className="register_inputs"
                    />
                    <p className="password-content">Use 8 or more characters with a mix of letters, numbers &
                        symbols</p>
                    <p className="register-input">Confirm Password</p>
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        isValid={!confirmPasswordError}
                        errorMessage={confirmPasswordError}
                        className="register_inputs"
                    />
                    <div style={{margin: "16px 0"}}></div>
                    <Button className="register-form__button" text="Create an account" shape="rounded"/>
                </form>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <p>{message}</p>
            </Modal>
        </div>
    );
};

export default Register;
