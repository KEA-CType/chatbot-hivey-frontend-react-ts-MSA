import instances from "../instance";
import {USER} from "../../commons/constants";

/**
 * 회원 가입
 */
const Register = async (email: string, userName: string, password: string, img: string) => {
    try {

        const response = await instances.INSTANCE.post(`${USER}/auth`, {
            email: email,
            name: userName,
            password: password,
            img: img,
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

        return await instances.INSTANCE.post(`/user-service/login`, {
            email: email,
            password: password,
        });

    } catch (error) {

        console.error(error);
        throw new Error("로그인에 실패하였습니다.");

    }
};

/**
 * 사용자 조회
 */
const GetUserInformation = async (userId: number) => {

    try {

        const response = await instances.AUTH_INSTANCE.get(`${USER}/users/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("사용자 정보를 가져오는 데 실패하였습니다.");

    }
}

const userService = {
    Register,
    Login,
    GetUserInformation,
}

export default userService;
