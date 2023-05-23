import instances from "../../utils";
import {SPACE} from "../../config/constants";

/**
 * 5.4 모든 스페이스 그룹 목록 불러오기
 */
const GetAllGroupList = async (spaceId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${SPACE}/${spaceId}/groups`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 그룹 목록을 불러오지 못하였습니다.");

    }
}

/**
 * 5.5 모든 스페이스 그룹과 그 멤버 목록 불러오기
 */
const GetAllGroupAndMemberList = async (spaceId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${SPACE}/${spaceId}/groups/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 그룹 목록과 멤버 목록을 불러오지 못하였습니다.");
    }
};

/**
 * 5.6 특정 스페이스 그룹 멤버 목록만 불러오기
 */
const GetMemberListByGroup = async (spaceId: number, groupId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${SPACE}/${spaceId}/groups/${groupId}/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 스페이스 그룹 멤버 목록을 불러오지 못하였습니다.");

    }
};

/**
 * 5.7 멤버가 속해 있지 않은 그룹 목록 불러오기
 */
const GetGroupListExceptMember = async (spaceId: number, memberId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${SPACE}/${spaceId}/groups/exclude?memberId=${memberId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 멤버가 속해 있지 않은 그룹 목록을 불러오지 못하였습니다.");

    }
}

const spaceGroupService = {
    GetAllGroupList,
    GetAllGroupAndMemberList,
    GetMemberListByGroup,
    GetGroupListExceptMember
}

export default spaceGroupService;
