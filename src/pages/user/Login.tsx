import "../../styles/login.css";

import logo from "../../assets/ic_logo_hivey.png";
import kakao from "../../assets/btn_signup_kakao.png";
import naver from "../../assets/btn_signup_naver.png";
import google from "../../assets/btn_signup_google.png";
import loginEmail from "../../assets/btn_signup_email.png";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";

import Button from "../../components/commons/buttons";
import Input from "../../components/commons/input";
import Modal from "../../components/commons/Modal";

import {userState} from "../../commons/Atom";
import {motion} from "framer-motion";

import authService from "../../services/user/auth";

import {validateEmail} from "../../utils/validationTest";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [notValidEmailMessage, setNotValidEmailMessage] = useState(""); // 이메일 형식이 잘못되었을 때 출력할 경고 문구
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidAll, setIsValidAll] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const setUser = useSetRecoilState(userState);

    useEffect(() => {

        if (isValidEmail && isValidPassword) {
            setIsValidAll(true);
        } else {
            setIsValidAll(false);
        }

    }, [isValidEmail, isValidPassword]);

    /**
     * 아이디를 입력받을 때 사용한다.
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
     * 비밀번호를 입력받을 때 사용한다.
     */
    const handlePasswordChange = (e: any) => {
        const inputPassword = e.target.value;
        setPassword(inputPassword);

        setIsValidPassword(true);
    };

    /**
     * 로그인 버튼을 눌렀을 때 사용한다.
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        authService
            .Login(email, password)
            .then((response) => {

                // 위의 함수에서 response.data를 받아온다.
                const {isSuccess, message} = response;
                const {userIdx, name, jwtToken} = response.result;

                if (isSuccess) {
                    // 요청이 성공한 경우

                    // 받아온 result 값을 파싱해서 전역 상태 관리 변수에 대입한다.
                    setUser({id: userIdx, name: name, email: email});

                    localStorage.setItem("jwt-token", jwtToken);

                    setIsModalOpen(true);
                    setModalHeader("로그인 성공");
                    setModalMessage("로그인에 성공하였습니다.");

                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/main");
                    }, 2000);

                } else {
                    // 요청이 실패한 경우
                    setIsModalOpen(true);
                    setModalHeader("로그인 실패");
                    setModalMessage("로그인에 실패하였습니다.");
                }
            })
            .catch((error) => {
                // console.log(error);
                setIsModalOpen(true);
                setModalHeader("로그인 실패");
                setModalMessage("로그인에 실패하였습니다.");
            });
    };

    return (
        <motion.div className="login-container" style={{y: 100}} animate={{y: 0}}>
            <div className="login-box">
                <img className="login-logo" src={logo} alt="Logo"/>
                <div className="logo-ment">Log in to your account or Sign up</div>
                <div className="login-gather">
                    <div className="social-login-container">
                        <div className="login-title">Sign up</div>
                        <div className="social-login-icons">
                            <div className="social-login-icon-gather">
                                <img className="social-login-icon" src={google} alt="Google"/>
                            </div>
                            <div className="social-login-icons">
                                <img className="social-login-icon" src={kakao} alt="Kakao"/>
                            </div>
                            <div className="social-login-icons">
                                <img className="social-login-icon" src={naver} alt="Naver"/>
                            </div>
                            <div className="social-login-icons">
                                <a href="/src/pages/user/SignUp.tsx"><img className="social-login-icon" src={loginEmail}
                                                                          alt="Email"/>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="login-box-form">
                        <form className="login-form" onSubmit={handleSubmit}>

                            <p className="login-title">Log in</p>

                            <p className="login-input">Email address</p>

                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="login_inputs"/>

                            {notValidEmailMessage && <div className="error-message">{notValidEmailMessage}</div>}

                            <p className="login-input">Password</p>

                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="login_inputs"/>

                            <div className="login-forgot">
                                <a href="#">Forget your password</a>
                            </div>

                            <br/>

                            <Button
                                className={isValidAll ? "home-btn-active" : "home-btn"}
                                text="Log in"
                                shape="rounded"/>

                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                header={modalHeader}>

                                <p>{modalMessage}</p>

                            </Modal>

                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
