import instances from "../axiosInstance";
import {SPACE} from "../../commons/constants";
import {Space, SpaceInformationResponse} from "../../commons/Interface";
import {CommonResponse} from "../commonResponse";

/**
 * 3.1 스페이스 생성하기
 */
const CreateSpace = async (userId: number, spaceName: string, img: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${SPACE}/${userId}/space`, {
            name: spaceName,
            img: img,
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 생성에 실패하였습니다.");

    }
}

/**
 * 3.4 참여한 스페이스 목록 불러오기
 */
const GetSpaceList = async (userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SPACE}/${userId}/spaces`);
        // console.log(`GetSpaceList/response.data.message: ${response.data.message}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("참여한 스페이스 목록을 불러오지 못하였습니다.");

    }
};

/**
 * 3.4 역할별로 참여한 스페이스 목록 불러오기
 */
const GetSpaceListByPosition = async (userId: number, isManager: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SPACE}/${userId}/spaces/position?isManager=${isManager}`);
        // console.log(`GetSpaceList/response.data.message: ${response.data.message}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("참여한 스페이스 목록을 불러오지 못하였습니다.");

    }
};

/**
 * 3.5 스페이스 조회하기
 */
const GetSpace = async (userId: number, spaceId: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.get<CommonResponse<SpaceInformationResponse>>(`${SPACE}/${userId}/${spaceId}`);
        return JSON.stringify(response.data);

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 조회에 실패하였습니다.");

    }
};

/**
 * 3.5 스페이스 조회하기 (Suspense 사용)
 */
export function fetchSpace(userId: number, spaceId: number) {
    let space: Space

    const suspender = instances.AUTH_INSTANCE.get(`${SPACE}/${userId}/${spaceId}`)
        .then((response) => {
            if (response.data) {
                setTimeout(() => {
                    space = response.data;
                }, 3000);
            } else {
                // console.log("스페이스 조회에 실패하였습니다.");
            }
        });

    return {
        read() {
            if (space === null) {
                throw suspender;
            } else {
                return space;
            }
        }
    };
}

/**
 * 4.1 스페이스 참여하기
 */
const EnterSpace = async (userId: number, accessCode: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${SPACE}/${userId}/members`, {
            accessCode: accessCode
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 가입에 실패하였습니다.");

    }
};

const spaceService = {
    CreateSpace,
    GetSpaceList,
    GetSpaceListByPosition,
    GetSpace,
    EnterSpace
}

export default spaceService;
