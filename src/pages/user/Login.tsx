import "../../styles/login.css";

import logo from "../../assets/ic_logo_hivey.png";
import kakao from "../../assets/btn_signup_kakao.png";
import naver from "../../assets/btn_signup_naver.png";
import google from "../../assets/btn_signup_google.png";
import loginEmail from "../../assets/btn_signup_email.png";

import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";

import Button from "../../components/buttons";
import Input from "../../components/input";
import Modal from "../../components/modals";

import {userState} from "../../commons/Atom";

import authService from "../../services/user/auth";

import {validateEmail} from "../../utils/validateEmail";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(""); // 이메일 형식이 잘못되었을 때 출력할 경고 문구
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [message, setMessage] = useState("");

    const [user, setUser] = useRecoilState(userState);

    /**
     * 아이디를 입력받을 때 사용한다.
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
     * 비밀번호를 입력받을 때 사용한다.
     */
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };

    /**
     * 아이디를 다음에도 기억할지 안 할지에 대한 여부를 체크할 때 사용한다.
     */
    const handleRememberMeChange = (e: any) => {
        setRememberMe(e.target.checked);
    };

    /**
     * 로그인 버튼을 눌렀을 때 사용한다.
     */
    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (emailError) {
            return;
        }

        // handle login submit
        authService
            .Login(email, password)
            .then((response) => {
                // 위의 함수에서 response.data를 받아온다.
                const {isSuccess, message} = response;
                const {userIdx, name, jwtToken} = response.result;

                if (isSuccess) {
                    // 요청이 성공한 경우
                    setMessage(message);

                    // 받아온 result 값을 파싱해서 전역 상태 관리 변수에 대입한다.
                    setUser({id: userIdx, name: name});

                    localStorage.setItem("jwt-token", jwtToken);
                    setIsModalOpen(true);

                    setTimeout(() => {
                        setIsModalOpen(false);
                        navigate("/main");
                    }, 2000);

                } else {
                    // 요청이 실패한 경우
                    setIsModalOpen(true);
                    setMessage(message);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsModalOpen(true);
                setMessage("로그인에 실패하였습니다.");
            });
    };

    return (
        <div className="login-container">
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
                                <a href="/src/pages/user/SignUp.tsx"><img className="social-login-icon" src={loginEmail} alt="Email"/>
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
                                className="login_inputs"
                            />
                            {emailError && <div className="error-message">{emailError}</div>}
                            <p className="login-input">Password</p>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="login_inputs"
                            />
                            <div className="login-forgot">
                                <a href="#">Forget your password</a>
                            </div>
                            <br/>
                            <Button className="HomeButtons" text="Log in" shape="rounded"/>
                            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                                <p>{message}</p>
                            </Modal>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
