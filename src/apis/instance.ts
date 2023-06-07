import axios from "axios";

/**
 * 공통으로 사용할 axios 인스턴스 생성
 */
const axiosApi = (options: []) => {

    return axios.create({
        baseURL: process.env.REACT_APP_MSA_BASE_URL,
        ...options
    });
}

/**
 * JWT 토큰이 필요한 axios 인스턴스 생성
 */
const axiosAuthApi = (options: []) => {
    const jwtToken = localStorage.getItem('jwt-token') || '';

    return axios.create({
        baseURL: process.env.REACT_APP_MSA_BASE_URL,
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
        },
        ...options,
    });

}

/**
 * Multer를 이용한 이미지를 업로드할 때 사용하는 인스턴스
 */
const axiosLocalhostApi = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_IMG_SERVER_URL
    });
}

const INSTANCE = axiosApi([]);
const AUTH_INSTANCE = axiosAuthApi([]);
const IMG_INSTANCE = axiosLocalhostApi();

const instances = {
    INSTANCE,
    AUTH_INSTANCE,
    IMG_INSTANCE
}

export default instances;
