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
            questionGroups:requestBody.questionGroups,
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

/**
 * 6.6 특정 설문 참여 현황 목록 불러오기
 */
const GetSubmissionListByForm = async (formId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${FORM}/${formId}/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 참여 현황 목록 불러오기에 실패하였습니다.");

    }
};

/**
 * 6.8 특정 설문의 타겟 그룹 목록 불러오기
 */
const GetTargetGroupsByForm = async (formId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${FORM}/${formId}/groups`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("특정 설문의 타겟 그룹 목록 불러오기에 실패하였습니다.");

    }
};

/**
 * 6.9 특정 설문의 필수 여부 정보 가져오기
 */
const GetMandatoryOrNotByForm = async (formId: number) => {
    try {

        const response = await instances.INSTANCE(`${FORM}/${formId}/option`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("특정 설문의 필수 여부 정보 가져오기에 실패하였습니다.");

    }
};

const formService = {
    CreateSurvey,
    CreateDetailedSurvey,
    GetFormList,
    GetSubmissionListByForm,
    GetTargetGroupsByForm,
    GetMandatoryOrNotByForm
};

export default formService;
