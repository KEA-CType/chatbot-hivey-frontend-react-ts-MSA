import {instance} from "../../utils";
import {AUTH} from "../../config/constants";

/**
 * 2.1 회원가입
 */
const Register = async (email: string, userName: string, password: string) => {
    try {
        const response = await instance.post(`${process.env.REACT_APP_BASE_URL}${AUTH}`, {
            email: email,
            name: userName,
            password: password,
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("회원가입에 실패하였습니다.");

    }
};

/**
 * 2.2 로그인
 */
const Login = async (email: string, password: string) => {
    try {
        const response = await instance.post(`${process.env.REACT_APP_BASE_URL}${AUTH}/login`, {
            email: email,
            password: password,
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("로그인에 실패하였습니다.");

    }
};

const auths = {
    Register,
    Login
}

export default auths;
