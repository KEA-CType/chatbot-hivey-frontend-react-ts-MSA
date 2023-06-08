import "../../styles/formanswer.css"
import React, {useState, useEffect, ReactElement, useContext} from "react";
import {useRecoilValue} from 'recoil';

import {useNavigate} from "react-router-dom";
import Modal from "../../components/commons/Modal";
import ShowAndAnswerForm from "../../components/form/ShowAndAnswerForm";


import {formIdState, selectedFormIdState, userState} from '../../commons/Atom';


import {FormResponse} from "../../commons/interfaces/commonInterface";



import {json} from "stream/consumers";

import sformService from "../../apis/services/sformService";

const FormAnswer = () => {
    const user = useRecoilValue(userState);
    const formId = useRecoilValue(formIdState);
    const [forms, setForms] = useState<FormResponse| null>(null);

    useEffect(() => {

        sformService
            .GetFormInfomation(4)//formId
            .then((response) => {
                console.log(response);
                const result = response.result;
                setForms({
                    formId: result.formId,
                    title: result.title,
                    content: result.content,
                    startDate: result.startDate,
                    endDate: result.endDate,
                    isAnonymous: result.isAnonymous,
                    isMandatory: result.isMandatory,
                    groups: result.groups,
                    questionRequests: result.questions
                })
                // setForms(result);
                //console.log(result);
                // // console.log(forms);
            }) //시간
            .catch((error) => {
                console.log(error);
            });

    }, [forms]);
    //forms&&console.log(forms);
    return (
        <>
            {forms && <ShowAndAnswerForm forms={forms}/>}
        </>
    );
}

export default FormAnswer;
