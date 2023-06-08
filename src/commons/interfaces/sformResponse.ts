/**
 * 설문 결과 보기
 */

export interface FormInformation {
    formId: number,
    title: string,
    content: string,
    creator: string,
    formLink: string,
    startDate: Date,
    endDate: Date,
    isAnonymous: string,
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
