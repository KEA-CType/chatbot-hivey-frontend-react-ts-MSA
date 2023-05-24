import instances from "../../utils";
import {FORM} from "../../config/constants";

/**
 * 6.1 설문 생성하기 : 아이디
 */
const CreateSurvey = async (spaceId: number, userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${FORM}/${spaceId}/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 생성에 실패하였습니다.");

    }
};

/**
 * 6.2 설문 생성하기 : All
 */
const CreateDetailedSurvey = async (formId: number, requestBody: any) => {
    try {

        const response = await instances.INSTANCE.patch(`${FORM}/${formId}`, {
            title: requestBody.title,
            content: requestBody.content,
            startDate: requestBody.startDate,
            endDate: requestBody.endDate,
            isAnonymous: requestBody.isAnonymous,
            isMandatory: requestBody.isMandatory,
            questionRequests: requestBody.questionRequests,
        });
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 생성에 실패하였습니다.");

    }
};

/**
 * 6.3 스페이스의 모든 설문 불러오기
 */
const GetFormList = async (spaceId: number, userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${FORM}/${spaceId}/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 목록 조회에 실패하였습니다.");

    }
};

const formService = {
    CreateSurvey,
    CreateDetailedSurvey,
    GetFormList
};

export default formService;
