import {authInstance} from "../../utils";
import {SPACE} from "../../config/constants";

/**
 * 4.3 스페이스 멤버의 그룹 변경하기
 */
const ChangeMemberGroup = async (userId: number, requestBody: any) => {
    try {

        const response = await authInstance.patch(`${SPACE}/${userId}/group`, {
            groupId: requestBody.groupId,
            memberId: requestBody.memberId
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("그룹 변경이 실패하였습니다.");

    }
};

const spaceMembers = {
    ChangeMemberGroup
}

export default spaceMembers;
