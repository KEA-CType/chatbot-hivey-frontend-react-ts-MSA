import "../../styles/formanswer.css"
import React, {useState, useEffect} from "react";
import {useRecoilValue} from 'recoil';

import ShowAndAnswerForm from "../../components/form/ShowAndAnswerForm";

import {formIdState, userState} from '../../commons/Atom';
import {FormResponse} from "../../commons/interfaces/commonInterface";

import sformService from "../../apis/services/sformService";

const FormAnswer = () => {
    const user = useRecoilValue(userState);
    const formId = useRecoilValue(formIdState);
    const [forms, setForms] = useState<FormResponse | undefined>();

    useEffect(() => {

        sformService
            .GetFormInfomation(formId)
            .then((response) => {

                const result = response.result;

                setForms({
                    formId: result.formId,
                    title: result.title,
                    content: result.content,
                    creator: result.creator,
                    formLink: result.formLink,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    isAnonymous: result.isAnonymous,
                    isMandatory: result.isMandatory,
                    groups: result.groups,
                    questions: result.questions
                });

            })
            .catch((error) => {
                console.log(error);
            });

    }, [formId]);

    return (
        <div className="form-overall-container">
            {forms && <ShowAndAnswerForm forms={forms}/>}
        </div>
    );
}

export default FormAnswer;
