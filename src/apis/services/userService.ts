import instances from "../instance";
import {USER} from "../../commons/constants";

/**
 * 회원 가입
 */
const Register = async (email: string, userName: string, password: string) => {
    try {

        const response = await instances.INSTANCE.post(`${USER}/auth`, {
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
 * 로그인
 */
const Login = async (email: string, password: string) => {
    try {

        return await instances.AUTH_INSTANCE.post(`/user-service/login`, {
            email: email,
            password: password,
        });

    } catch (error) {

        console.error(error);
        throw new Error("로그인에 실패하였습니다.");

    }
};

const userService = {
    Register,
    Login
}

export default userService;
