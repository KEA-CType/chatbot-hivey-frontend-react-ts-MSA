/**
 * 설문 결과 화면
 */

import "../../styles/formresult.css";

import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import PropTypes from "prop-types";
import {motion} from "framer-motion";

import {
    FormAnswerListProps,
    FormResultInformationProps, MultipleAnswerResponseProps, PieChartData,
    SubjectiveAnswerResponseProps
} from "../../commons/interfaces/propsInterface";
import {Answer, FormInformation} from "../../commons/interfaces/sformResponse";

import sformService from "../../apis/services/sformService";

import icFormResultLogo from "../../assets/ic_form_result_logo.png";
import * as moment from "moment/moment";
import {MyResponsivePie} from "./Chart";

/**
 * 설문에 대한 기본 정보를 보여주는 컴포넌트
 */
const FormResultInformation = ({formInformation, answers}: FormResultInformationProps) => {
    const navigate = useNavigate();

    if (!formInformation || !answers) {
        navigate("/main");
        return <></>;
    }

    return (
        <div className="form-result-container">

            {/* 로고 */}
            <div className="form-result-icon-wrapper">

                <img className="form-result-icon-img" src={icFormResultLogo} alt="logo"/>

            </div>

            {/* 설문 정보 */}
            <motion.div className="form-result-rectangle-white" style={{y: 100}} animate={{y: 0}}>

                {/* 설문 제목, 설명 */}
                <div className="form-result-title-container">

                    <div className="form-result-title">{formInformation.title}</div>
                    <div className="form-result-title-separator"></div>
                    <div className="form-result-content">{formInformation.content}</div>

                </div>

                {/* 설문 생성자, 마감 날짜, 익명 여부, 링크 */}
                <div className="form-result-information-container">

                    <div className="form-result-information-table-container">

                        <table className="form-result-information-table">
                            <tbody>
                            <tr>
                                <td className="form-result-information-td-header">제작자</td>
                                <td style={{color: "gray"}}>|</td>
                                <td className="form-result-information-td-content">{formInformation.creator}</td>
                            </tr>
                            <tr>
                                <td className="form-result-information-td-header">설문 기간</td>
                                <td style={{color: "gray"}}>|</td>
                                <td className="form-result-information-td-content">{(moment(formInformation.startDate)).format('YYYY.MM.DD')} ~ {(moment(formInformation.endDate)).format('YYYY.MM.DD')}</td>
                            </tr>
                            <tr>
                                <td className="form-result-information-td-header">익명 여부</td>
                                <td style={{color: "gray"}}>|</td>
                                <td className="form-result-information-td-content">{formInformation.isAnonymous === "Y" ? "익명" : "실명"}</td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="form-result-information-link-container">

                        <div className="form-result-information-link">{formInformation.formLink}</div>
                        <div style={{color: "gray", cursor: "default", marginLeft: "1rem"}}>|</div>
                        <button className="form-result-information-link-btn">Copy</button>

                    </div>

                </div>

            </motion.div>

            <div className="form-result-content-container">

                <FormAnswerList answers={answers}/>

            </div>

        </div>
    );
}

FormResultInformation.propTypes = {
    formInformation: PropTypes.object,
    answers: PropTypes.array,
}

/**
 * 설문에 대한 답변 내용을 담는 컨테이너 역할의 컴포넌트
 */
const FormAnswerList = ({answers}: FormAnswerListProps) => {

    const [allAnswers, setAllAnswers] = useState(Array);

    useEffect(() => {

        // 질문을 questionId에 맞게 정렬한다.
        answers.sort((a, b) => a.questionId > b.questionId ? 1 : -1);

        const updatedAnswers = answers.map(
            (a: any, i: number) => {

                return (
                    <motion.div className="form-result-answer-rectangle-white" style={{y: 100}} animate={{y: 0}}>

                        {/* 객관식 질문/주관식 질문 공통 */}
                        <div className="form-result-answer-title-container">

                            <div className="form-result-answer-number">Q{i + 1}.</div>

                            <div className="form-result-answer-title">{a.title}</div>

                            <div className="form-result-answer-content">{a.content}</div>

                        </div>

                        {/* a.answerResults가 null이면 객관식 질문, 값이 있다면 주관식 질문에 대한 응답 */}
                        {a.answerResults === null
                            ? <MultipleAnswerResponse answers={a.multipleAnswerResults}/>
                            : <SubjectiveAnswerResponse answers={a.answerResults}/>}

                    </motion.div>
                );
            });

        setAllAnswers(updatedAnswers);

    }, [answers])

    return <>{allAnswers}</>;
}

/**
 * 객관식 답변에 대한 컴포넌트
 */
const MultipleAnswerResponse = ({answers}: MultipleAnswerResponseProps) => {

    const [datas, setDatas] = useState<PieChartData[]>([]);

    useEffect(() => {

        const updatedDatas: PieChartData[] = answers.map(
            (a: any) => {

                const id = a.optionId;
                const label = a.optionContent;
                const value = a.count;

                return {
                    "id": id.toString(),
                    "label": label.toString(),
                    "value": value.toString(),
                    "color": "hsl(147, 70%, 50%)"
                };
            }
        );

        setDatas(updatedDatas);

    }, []);

    return (
        <>
            {datas.length === 0 ? (
                <div className="multiple-answer-error">데이터가 없습니다.</div>
            ) : (
                <div className="multiple-answer-container">
                    <MyResponsivePie data={datas}/>
                </div>
            )}
        </>
    );
}

/**
 * 주관식 답변에 대한 컴포넌트
 */
const SubjectiveAnswerResponse = ({answers}: SubjectiveAnswerResponseProps) => {

    const [subjectiveAnswers, setSubjectiveAnswers] = useState(Array);

    useEffect(() => {

        const updatedAnswers = answers.map(
            (a: any, i: number) => {

                return (
                    <div className="subjective-answer-container">
                        <div className="subjective-answer-name">{a.name}</div>
                        <div className="subjective-answer-content">{a.answer}</div>
                    </div>
                );
            });

        setSubjectiveAnswers(updatedAnswers);

    }, [answers]);

    return <>{subjectiveAnswers}</>
}

const FormResult = () => {

    const {formId} = useParams();

    const [formInformation, setFormInformation] = useState<FormInformation>({} as FormInformation);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {

        /**
         * 설문 결과 보기
         * /sform-service/forms/:formId/result
         *
         * {
         *     "isSuccess": true,
         *     "code": 1000,
         *     "message": "요청에 성공하였습니다.",
         *     "result": {
         *         "formId": 3,
         *         "title": "그만 하고 싶다",
         *         "content": "제발",
         *         "creator": "chaeanna",
         *         "formLink": "http://hivey.com/surveys/3/result",
         *         "startDate": "2023-04-24T00:00:00.000+00:00",
         *         "endDate": "2023-04-30T00:00:00.000+00:00",
         *         "isAnonymous": "N",
         *         "getQuestionResults": [
         *             {
         *                 "questionId": 6,
         *                 "title": "주관식",
         *                 "content": "주관식이다",
         *                 "multipleAnswerResults": null,
         *                 "answerResults": [
         *                     {
         *                         "answerId": 1,
         *                         "name": "chaeanna",
         *                         "answer": "answer 1"
         *                     }
         *                 ]
         *             },
         *             {
         *                 "questionId": 7,
         *                 "title": "객관식",
         *                 "content": "객관식이다",
         *                 "multipleAnswerResults": [
         *                     {
         *                         "optionId": 8,
         *                         "optionContent": "옵션1",
         *                         "count": 1
         *                     },
         *                     {
         *                         "optionId": 9,
         *                         "optionContent": "옵션2",
         *                         "count": 0
         *                     }
         *                 ],
         *                 "answerResults": null
         *             }
         *         ]
         *     }
         * }
         */
        sformService
            .GetFormResult(formId !== undefined ? formId.toString() : "")
            .then((response) => {

                const result = response.result;

                if (response.isSuccess && response.code !== 2000) {

                    // 설문 정보
                    setFormInformation({
                        formId: result.formId,
                        title: result.title,
                        content: result.content,
                        creator: result.creator,
                        formLink: result.formLink,
                        startDate: result.startDate,
                        endDate: result.endDate,
                        isAnonymous: result.isAnonymous
                    });

                    // 답변
                    setAnswers(result.getQuestionResults);

                }

            })
            .catch((error) => {
                console.log(`error: ${error}`);
            });

    }, [formId]);

    return (
        <div>
            <FormResultInformation formInformation={formInformation} answers={answers}/>
        </div>
    );
}

FormResult.propTypes = {
    spaceId: PropTypes.number,
    formId: PropTypes.number,
}

export default FormResult;
