import "../../styles/formanswer.css"
import React, {useState, useEffect, ReactElement,useContext} from "react";
import {useNavigate} from "react-router-dom";
import Modal from  "../../components/commons/Modal";
import {useRecoilValue} from 'recoil';
import {selectedFormIdState, userState} from '../../commons/Atom';
import formAnswerService from "../../services/form/formAnswer";
import { json } from "stream/consumers";
import { FormAnswerResponse } from "../../commons/Interface";

import ShowForm from "../../components/form/ShowForm";

const FormAnswer = () => {
    const user = useRecoilValue(userState);
    const [forms, setForms] = useState<FormAnswerResponse|null>(null);
    useEffect(()=>{
        formAnswerService
        .GetFormInfomation(1)
        .then((response)=>{

            const result=response.result;
            setForms({
                formId:result.formId,title:result.title,content:result.content, startDate:result.startDate, endDate:result.endDate,isAnonymous:result.isAnonymous,isMandatory:result.isMandatory,groups:result.groups,questions:result.questions
            })
            console.log(result);
            console.log(forms);
        }) //시간
        .catch((error)=>{
            console.log(error);
        });
    },[]);

    return(
        <>
            {forms && <ShowForm forms={forms}/>}
        </>
        
        
    )
}

export default FormAnswer;
