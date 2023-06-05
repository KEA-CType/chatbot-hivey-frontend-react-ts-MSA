
export interface User {
    id: number;
    name: String;
    email: String;
}

export interface Space {
    id: number;
    name: String;
}

export interface SpaceOnly {
    name: string;
    img: string;
    memberCount: number;
}

export interface SpaceInformationResponse {
    name: string;
    img: string;
    forms: FormListResponse[];
    memberCount: number;
    groups: GroupListResponse[];
}

export interface FormListResponse {
    formId: number;
    creator: string;
    title: string;
    startDate: Date;
    endDate: Date;
}

export interface GroupListResponse {
    groupId: number;
    name: string;
    members: GroupMemberListResponse[];
}

export interface GroupMemberListResponse {
    memberId: number;
    name: string;
    position: string;
}

export interface SubmissionListResponse {
    formId: number,
    memberId: number,
    email: string,
    name: string,
    groupId: number,
    submit: boolean,
    mandatory: boolean
}

export interface TargetGroupListResponse {
    formId: number,
    groupId: number,
    groupName: number
}

export interface Image {
    file: string,
    url: string
}

export interface FormResultInformationProps {
    formInformation: FormInformation;
    answers: Answer[];
}

export interface FormInformation {
    formId: number,
    title: string,
    content: string,
    formLink: string,
    creator: string,
    startDate: Date,
    endDate: Date,
    isAnonymous: boolean,
}

export interface Answer {
    questionId: number,
    title: string,
    content: string,
    multipleAnswer: MultipleAnswer[],
    subjectiveAnswer: SubjectiveAnswer[],
}

export interface MultipleAnswer {
    optionId: number,
    optionContent: string,
    count: number,
}

export interface SubjectiveAnswer {
    answerId: number,
    name: string,
    answer: string,
}
