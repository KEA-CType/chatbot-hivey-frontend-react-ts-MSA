
export interface User {
    id: number;
    name: String;
}

export interface Space {
    id: number;
    name: String;
}

export interface SpaceInformationResponse {
    name: string;
    img: string;
    forms: FormListResponse[];
    memberCount: number;
    groups: GroupListResponse[];
}

export interface FormListResponse {
    creator: string;
    title: string;
    startDate: Date;
    endDate: Date;
}

export interface GroupListResponse {
    name: string;
    members: GroupMemberListResponse[];
}

export interface GroupMemberListResponse {
    memberId: number;
    name: string;
    position: string;
}
