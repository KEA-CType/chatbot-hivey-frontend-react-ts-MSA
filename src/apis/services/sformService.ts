import instances from "../instance";
import {SFORM} from "../../commons/constants";

import {SpaceInformationResponse} from "../../commons/interfaces/commonInterface";


import {CommonResponse} from "../../commons/interfaces/commonResponse";

/**
 * 스페이스 생성하기
 */
const CreateSpace = async (userId: number, spaceName: string, img: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${SFORM}/spaces/${userId}`, {
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
 * 참여한 스페이스 목록 불러오기
 */
const GetSpaceList = async (userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/spaces/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("참여한 스페이스 목록을 불러오지 못하였습니다.");

    }
};

/**
 * 스페이스 조회하기
 */
const GetSpace = async (userId: number, spaceId: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.get<CommonResponse<SpaceInformationResponse>>(`${SFORM}/spaces/${spaceId}/${userId}`);
        return JSON.stringify(response.data);

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 조회에 실패하였습니다.");

    }
};

/**
 * 스페이스 참여하기
 */
const EnterSpace = async (userId: number, accessCode: string) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${SFORM}/spaces/${userId}/members`, {
            accessCode: accessCode
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 가입에 실패하였습니다.");

    }
};

/**
 * 모든 스페이스 그룹 목록 불러오기
 */
const GetAllGroupList = async (spaceId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/spaces/${spaceId}/groups`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 그룹 목록을 불러오지 못하였습니다.");

    }
}

/**
 * 모든 스페이스 그룹과 그 멤버 목록 불러오기
 */
const GetAllGroupAndMemberList = async (spaceId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/spaces/${spaceId}/groups/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("스페이스 그룹 목록과 멤버 목록을 불러오지 못하였습니다.");
    }
};

/**
 * 특정 스페이스 그룹 멤버 목록만 불러오기
 */
const GetMemberListByGroup = async (spaceId: number, groupId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/spaces/${spaceId}/groups/${groupId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 스페이스 그룹 멤버 목록을 불러오지 못하였습니다.");

    }
};

/**
 * 설문 생성하기 : 아이디
 */
const CreateSurvey = async (spaceId: number, userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.post(`${SFORM}/forms/${spaceId}/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 생성에 실패하였습니다.");

    }
};

/**
 * 설문 생성하기 : All
 */
const CreateDetailedSurvey = async (formId: number, requestBody: any) => {
    try {


        const response = await instances.AUTH_INSTANCE.patch(`${SFORM}/forms/${formId}`, {

            title: requestBody.title,
            content: requestBody.content,
            startDate: requestBody.startDate,
            endDate: requestBody.endDate,
            isAnonymous: requestBody.isAnonymous,
            isMandatory: requestBody.isMandatory,
            groups: requestBody.groups,
            questionRequests: requestBody.questionRequests,
        });

        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 생성에 실패하였습니다.");

    }
};

/**
 * 설문 응답하기
 */

const AnswerForm=async (formId:number, userId:number,requestBody:any)=>{
    try{

        console.log(`multipleChoiceAnswers: ${JSON.stringify(requestBody.multipleChoiceAnswers)}`);
        console.log(`shortAnswerResponses: ${JSON.stringify(requestBody.shortAnswerResponses)}`);
        const response=await instances.AUTH_INSTANCE.post(`${SFORM}/forms/answer/${formId}/${userId}`,{
            multipleChoiceAnswers:requestBody.multipleChoiceAnswers,
            shortAnswerResponses:requestBody.shortAnswerResponses
            
        });
        console.log(requestBody);
        
        return response.data;
    }
    catch(error){

        console.error(error);
        throw new Error("설문 응답에 실패하였습니다.");
    }
}


/**
 * 스페이스의 모든 설문 불러오기
 */
const GetFormList = async (spaceId: number, userId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${spaceId}/${userId}`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 목록 조회에 실패하였습니다.");

    }
};

/**
 * 설문 참여 현황 목록 불러오기
 */
const GetSubmissionListByForm = async (formId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${formId}/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("설문 참여 현황 목록 불러오기에 실패하였습니다.");

    }
};

/**
 * 특정 설문의 타겟 그룹 목록 불러오기
 */
const GetTargetGroupsByForm = async (formId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${formId}/groups`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("특정 설문의 타겟 그룹 목록 불러오기에 실패하였습니다.");

    }
};

/**
 * 특정 설문의 필수 여부 정보 가져오기
 */
const GetMandatoryOrNotByForm = async (formId: number) => {
    try {

        const response = await instances.AUTH_INSTANCE(`${SFORM}/forms/${formId}/option`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("특정 설문의 필수 여부 정보 가져오기에 실패하였습니다.");

    }
};

/**
 * 특정 설문지 불러오기 (질문 조회하기)
 */
const GetFormInfomation = async (formId: number) => {
    try {
        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${formId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("해당 설문의 정보를 불러오지 못하였습니다.");
    }
}

/**
 * 설문 결과 보기
 */
const GetFormResult = async (formId: string) => {

    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${formId}/result`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 설문의 결과를 불러오지 못하였습니다.");

    }

}

/**
 *
 */
const GetSubmissionByUser = async (formId: number, userId: number) => {

    try {

        const response = await instances.AUTH_INSTANCE.get(`${SFORM}/forms/${formId}/${userId}/submission`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 설문의 참여 여부를 불러오지 못하였습니다.");

    }

}

const sformService = {
    CreateSpace,
    GetSpaceList,
    GetSpace,
    EnterSpace,
    GetAllGroupList,
    GetAllGroupAndMemberList,
    GetMemberListByGroup,
    CreateSurvey,
    CreateDetailedSurvey,
    AnswerForm,
    GetFormList,
    GetSubmissionListByForm,
    GetTargetGroupsByForm,
    GetMandatoryOrNotByForm,
    GetFormInfomation,
    GetFormResult,
    GetSubmissionByUser,
}

export default sformService;
