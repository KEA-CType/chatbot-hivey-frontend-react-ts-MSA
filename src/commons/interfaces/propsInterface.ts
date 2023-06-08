import {Answer, FormInformation, MultipleAnswer, SubjectiveAnswer} from "./sformResponse";

export interface FormResultInformationProps {
    formInformation: FormInformation;
    answers: Answer[];
}

export interface FormAnswerListProps {
    answers: Answer[];
}

export interface MultipleAnswerResponseProps {
    answers: MultipleAnswer[]
}

export interface SubjectiveAnswerResponseProps {
    answers: SubjectiveAnswer[]
}

export interface PieChartData {
    id: string,
    label: string,
    value: string,
    color: string,
}

export interface MyResponsivePieProps {
    data: PieChartData
}
