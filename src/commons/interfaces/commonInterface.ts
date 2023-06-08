
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
    target: boolean;
    submit: boolean;
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
    getUserRes: UserResponse,
    groupId: number,
    submit: boolean,
    mandatory: boolean
}

export interface UserResponse {
    userId: number,
    img: string,
    email: string,
    name: string,
}

export interface TargetGroupListResponse {
    formId: number,
    groupId: number,
    groupName: number
}


export interface FormCreateRequest{
    title: string,
    content: string,
    startDate:Date|string,
    endDate:Date|string,
    isAnonymous:string,
    isMandatory:string,
    groups:number[],
    questionRequests:object[]
}

export interface FormAnswerResponse{
    formId:number,
    title: string,
    content: string,
    startDate:Date|string,
    endDate:Date|string,
    isAnonymous:string,
    isMandatory:string,
    groups:number[],
    questions:object[]

}

export interface Image {
    file: string,
    url: string
}
