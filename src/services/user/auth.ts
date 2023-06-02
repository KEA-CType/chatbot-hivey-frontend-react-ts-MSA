import instances from "../axiosInstance";
import {AUTH} from "../../commons/constants";

/**
 * 2.1 회원가입
 */
const Register = async (email: string, userName: string, password: string) => {
    try {

        const response = await instances.INSTANCE.post(`${AUTH}`, {
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
        const response = await instances.INSTANCE.post(`${AUTH}/login`, {
            email: email,
            password: password,
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("로그인에 실패하였습니다.");

    }
};

const authService = {
    Register,
    Login
}

export default authService;
