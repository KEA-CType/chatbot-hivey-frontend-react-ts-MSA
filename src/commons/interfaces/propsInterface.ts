import {Answer, FormInformation} from "../../apis/interfaces/sformResponse";

export interface GetFormResultProps {
    spaceId: number;
    formId: number;
}

export interface FormResultInformationProps {
    formInformation: FormInformation;
    answers: Answer[];
}
