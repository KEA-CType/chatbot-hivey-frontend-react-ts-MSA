import instances from "../../utils";
import {FORM} from "../../config/constants";

/**
 * 6.5 특정 설문 참여 현황 목록 불러오기
 */
const GetFormSubmissionList = async (formId: number) => {
    try {

        const response = await instances.INSTANCE.get(`${FORM}/${formId}/members`);
        return response.data;

    } catch (error) {

        console.error(error);
        throw new Error("해당 설문의 참여 현황을 불러오지 못하였습니다.");

    }
};
const GetFormInfomation=async(formId:number)=>{
    try{
        const response=await instances.INSTANCE.get(`${FORM}/${formId}`);
        return response.data;
    }catch (error){
        console.error(error);
        throw new Error("해당 설문의 정보를 불러오지 못하였습니다.");
    }
}


const formAnswerService = {
    GetFormSubmissionList,
    GetFormInfomation
}

export default formAnswerService;
