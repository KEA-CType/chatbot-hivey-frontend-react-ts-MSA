import React, {useState, useEffect} from "react";


import {MultiAnswer, TextAnswer, FormAnswer} from "../../commons/interfaces/commonInterface";
import sformService from "../../apis/services/sformService";
import {useRecoilValue} from "recoil";
import {formIdState, userState} from "../../commons/Atom";
import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";

const ShowAndAnswerForm = ({forms}: any) => {

    console.log(`forms: ${JSON.stringify(forms)}`);

    const user = useRecoilValue(userState);
    const formId = useRecoilValue(formIdState);

    const navigate = useNavigate();

    const [multiAnswer, setMultiAnswer] = useState<MultiAnswer[]>([]);
    const [shortAnswer, setShortAnswer] = useState<TextAnswer[]>([]);
    const [longAnswer, setLongAnswer] = useState<TextAnswer[]>([]);
    const [answerRequest, setAnswerRequest] = useState<FormAnswer>();

    const questions = forms.questions;

    const handleAnswerChange = (q: any, answer: any) => {
        const questionId = q.questionId;

        if (q.type === "S") {
            // 주관식 질문일 때
            const existingAnswer = shortAnswer.find((a) => a.questionId === questionId);

            if (existingAnswer) {
                // 이미 해당 질문에 대한 답변이 있는 경우
                setShortAnswer((prevShortAnswer) =>
                    prevShortAnswer.map((a) =>
                        a.questionId === questionId
                            ? {questionId: questionId, answer: answer.target.value}
                            : a
                    )
                );

            } else {
                // 해당 질문에 대한 답변이 없는 경우
                setShortAnswer((prevShortAnswer) => [
                    ...prevShortAnswer,
                    {questionId: questionId, answer: answer.target.value},
                ]);

            }

            shortAnswer && console.log(shortAnswer);

        } else if (q.type === "M") {
            // 객관식 질문인 경우
            const existingAnswer = multiAnswer.find((a) => a.questionId === questionId);
            if (existingAnswer) {
                // 이미 해당 질문에 대한 답변이 있는 경우
                setMultiAnswer((prevMultiAnswer) =>
                    prevMultiAnswer.map((a) =>
                        a.questionId === questionId
                            ? {questionId: questionId, optionIds: answer}
                            : a
                    )
                );

            } else {
                // 해당 질문에 대한 답변이 없는 경우
                setMultiAnswer((prevMultiAnswer) => [
                    ...prevMultiAnswer,
                    {questionId: questionId, optionIds: answer},
                ]);

            }

            shortAnswer && console.log(multiAnswer);

        } else if (q.type === "L") {
            const existingAnswer = longAnswer.find((a) => a.questionId === questionId);

            if (existingAnswer) {
                // 이미 해당 질문에 대한 답변이 있는 경우
                setLongAnswer((prevLongAnswer) =>
                    prevLongAnswer.map((a) =>
                        a.questionId === questionId
                            ? {questionId: questionId, answer: answer.target.value}
                            : a
                    )
                );

            } else {
                console.log("length", longAnswer.length)
                // 해당 질문에 대한 답변이 없는 경우
                setLongAnswer((prevLongAnswer) => [
                    ...prevLongAnswer,
                    {questionId: questionId, answer: answer.target.value},
                ]);

            }

            longAnswer && console.log(longAnswer);
        }
    };

    const CheckQuestionType = (q: any, index: number) => {
        const [inputCount, setInputCount] = useState(0);
        const [optionList, setOptionList] = useState<string[]>([]);
        const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

        const handleCheckboxChange = (optionId: number) => {
            if (selectedOptions.includes(optionId)) {
                setSelectedOptions(selectedOptions.filter((item) => item !== optionId));
            } else {
                setSelectedOptions([...selectedOptions, optionId]);
            }
        };

        useEffect(() => {
            if (q && selectedOptions.length > 0) {
                handleAnswerChange(q, selectedOptions);
            }
        }, [selectedOptions]);

        if (questions[index].type === "M") {
            return (
                <div className="question-answer-container">

                    <div className="question-number">
                        Q{index + 1}.
                    </div>

                    <div className="multi-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>

                    <div className="checkbox-container">
                        {questions[index].options.map((o: any) => {
                                return (
                                    <div className="multi-option" key={o.optionId}>
                                        <input id={o.optionId} type="checkbox" className="multi-option-input"
                                               checked={selectedOptions.includes(o.optionId)}
                                               onChange={(e) => handleCheckboxChange(o.optionId)}/>
                                        <label className="multi-option-label" htmlFor={o.optionId}>{o.option}</label>
                                    </div>)
                            }
                        )}
                    </div>
                </div>
            )

        } else if (questions[index].type === "S") {

            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };

            return (
                <motion.div className="question-answer-container" style={{y: 100}} animate={{y: 0}}>
                    <div className="question-number">
                        Q{index + 1}.
                    </div>
                    <div className="short-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="short-question-answer">
                        <div className="answer-write-here">

                            <input className="text-answer-input" type="text" onChange={(e) => {
                                onInputHandler(e);
                                handleAnswerChange(q, e)
                            }} maxLength={50}/>
                            <div className="text-counter">{inputCount}/50</div>
                        </div>
                    </div>
                </motion.div>

            )

        } else if (questions[index].type === "L") {

            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };

            return (
                <div className="question-answer-container">

                    <div className="question-number">
                        Q{index + 1}
                    </div>

                    <div className="long-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>

                    <div className="long-question-answer">
                        <div className="write-here">
                            ddd
                            <input className="text-answer-input" type="text" onChange={(e) => {
                                onInputHandler(e);
                                handleAnswerChange(q, e)
                            }} maxLength={500}/>
                            <div className="text-counter">{inputCount}/500</div>
                        </div>
                    </div>

                </div>
            )
        }
    }

    /**
     * 작성한 설문을 제출한다.
     */
    const handelSubmit = () => {
        const sortedMultiAnswer = multiAnswer.sort((a, b) => a.questionId - b.questionId);
        const sortedShortAnswer = shortAnswer.sort((a, b) => a.questionId - b.questionId);
        const sortedLongAnswer = longAnswer.sort((a, b) => a.questionId - b.questionId);

        const requestBody: FormAnswer = {
            multipleChoiceAnswers: sortedMultiAnswer,
            shortAnswerResponses: sortedShortAnswer,
        };

        // API 호출
        sformService
            .AnswerForm(formId, user.id, requestBody).then((response) => {
            const {isSuccess, message} = response;
            if (isSuccess) {
                console.log("생성에 성공하였습니다");
                navigate("/main");
            } else {
                console.log("생성에 실패하였습니다");
                console.log(message);
            }
        });
    }

    return (
        <div>
            <div className="form-answer-container">
                <motion.div className="form-information" style={{y: 100}} animate={{y: 0}}>
                    <div className="form-title-container">
                        <div className="form-title">{forms?.title}</div>
                        <div className="form-content">{forms?.content}</div>
                    </div>
                    <div className="form-explain">
                        <div className="left-explain">
                            <span className="span-blank">작성자   </span>
                            <span className="span-blank">설문 기간  </span>
                            <span className="span-blank">익명 여부</span>
                        </div>
                        <div className="right-explain">
                            <span className="span-blank">{forms.creator}</span>
                            <span className="span-blank">{forms.startDate.substring(2, 10)}~{forms.endDate.substring(2, 10)}</span>
                            <span className="span-blank">
                                {
                                    forms.isAnonymous === "N" ?
                                        "실명" :
                                        "익명"
                                }
                        </span>
                        </div>

                        {/*<div className="link-container">*/}
                        {/*    {forms.formLink}*/}
                        {/*</div>*/}

                    </div>

                </motion.div>

                <div className="form-question-container">
                    {
                        forms.questions.map((q: any, index: number) => {
                            return (CheckQuestionType(q, index));
                        })
                    }
                </div>
            </div>

            <div className="button-container">
                <button className="submit-button" onClick={handelSubmit}>제출</button>
                <button className="cancel-button">초기화</button>
            </div>

        </div>

    )
}

export default ShowAndAnswerForm;