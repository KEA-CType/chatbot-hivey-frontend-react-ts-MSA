/**
 * 설문 결과 화면
 */

import "../../styles/formresult.css";

import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import PropTypes from "prop-types";
import {motion} from "framer-motion";

import {FormResultInformationProps, GetFormResultProps} from "../../commons/interfaces/propsInterface";
import {Answer, FormInformation} from "../../apis/interfaces/sformResponse";

import sformService from "../../apis/services/sformService";

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

            <div className="form-result-icon-wrapper">

                <img className="form-result-icon-img" alt="logo"/>
                <img className="form-result-icon-red-img" alt="form"/>

            </div>

            <motion.div className="form-result-rectangle-white" style={{y: 100}} animate={{y: 0}}>

                <div className="form-result-title-container">

                    <div className="form-result-title"></div>
                    <div className="form-result-content"></div>

                </div>

                <div className="form-result-information-container">

                    <div className="form-result-information-table-container">

                        <table className="form-result-information-table">
                            <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>

                    </div>

                    <div className="form-result-information-link-container">

                        <div className="form-result-information-link"></div>
                        <button className="form-result-information-link-btn"></button>

                    </div>

                </div>

            </motion.div>

            <motion.div className="form-result-content-container"  style={{y: 100}} animate={{y: 0}}>

                <FormAnswerList />

            </motion.div>

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
const FormAnswerList = () => {

    return (
        <div className="form-result-answer-container">

            <div className="form-result-answer-rectangle-white">

                <div className="form-result-answer-title-container">

                    <div className="form-result-answer-number">

                    </div>

                    <div className="form-result-answer-title">

                    </div>

                    <div className="form-result-answer-content">

                    </div>

                </div>

                {/* 이 부분을 useEffect 등을 이용하여 안에 넣어야 한다. (분기 처리) */}

                <MultipleAnswer />

                <SubjectiveAnswer />

            </div>

        </div>
    );
}

/**
 * 객관식 답변에 대한 컴포넌트
 */
const MultipleAnswer = () => {

    return (
        <div className="form-result-answer-multiple-type">

        </div>
    );
}

/**
 * 주관식 답변에 대한 컴포넌트
 */
const SubjectiveAnswer = () => {

    return (
        <div className="form-result-answer-subjective-type">

        </div>
    );
}

/**
 *
 */
const FormResult = ({spaceId, formId}: GetFormResultProps) => {
    const navigate = useNavigate();

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
            .GetFormResult(formId)
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

                    console.log(`result.getQuestionResults: ${result.getQuestionResults}`);

                }

            })
            .catch((error) => {
                console.log(`error: ${error}`);

                // 데이터를 불러오지 못했을 경우 이전 페이지로 이동한다.
                navigate(-1);
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
