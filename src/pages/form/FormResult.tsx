/**
 * 설문 결과 화면
 */

import "../../styles/formresult.css";

import PropTypes from "prop-types";
import {useEffect, useState} from "react";

import {Answer, FormInformation, FormResultInformationProps} from "../../commons/Interface";
import {useNavigate} from "react-router-dom";

import {motion} from "framer-motion";

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

const MultipleAnswer = () => {

    return (
        <div className="form-result-answer-multiple-type">

        </div>
    );
}

const SubjectiveAnswer = () => {

    return (
        <div className="form-result-answer-subjective-type">

        </div>
    );
}

/**
 *
 */
const FormResult = () => {
    const [formInformation, setFormInformation] = useState<FormInformation>({} as FormInformation);
    const [answers, setAnswers] = useState<Answer[]>([]);

    useEffect(() => {

    }, []);

    return (
        <div>
            <FormResultInformation formInformation={formInformation} answers={answers}/>
        </div>
    );
}

FormResultInformation.propTypes = {
    formInformation: PropTypes.object,
    answers: PropTypes.array,
}

export default FormResult;
