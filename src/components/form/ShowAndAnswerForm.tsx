import React, {useState, useEffect, ReactElement,useContext} from "react";


import {MultiAnswer, TextAnswer,FormAnswer} from "../../commons/interfaces/Interface";
import sformService from "../../apis/services/sformService";
const ShowAndAnswerForm=({forms}: any)=>{
    //console.log(forms);
    const questions=forms?.questionRequests;
    //console.log(questions);
    const [multiAnswer,setMultiAnswer]=useState<MultiAnswer[]>([]);
    const [shortAnswer,setShortAnswer]=useState<TextAnswer[]>([]);
    const [longAnswer,setLongAnswer]=useState<TextAnswer[]>([]);
    
    const [answerRequest,setAnswerRequest]=useState<FormAnswer>();

    
    const handleAnswerChange = (q:any,answer:any) => {
        const questionId= q.questionId;
        if (q.type === "S") {
            console.log("S");
            const existingAnswer = shortAnswer.find((a) => a.questionId === questionId);
            if (existingAnswer) {
            // 이미 해당 질문에 대한 답변이 있는 경우
            setShortAnswer((prevShortAnswer) =>
                prevShortAnswer.map((a) =>
                a.questionId === questionId
                    ? { questionId: questionId, answer: answer.target.value }
                    : a
                )
            );
            }else{
                console.log("length",shortAnswer.length)
                // 해당 질문에 대한 답변이 없는 경우
                setShortAnswer((prevShortAnswer) => [
                    ...prevShortAnswer,
                    { questionId: questionId, answer: answer.target.value },
                ]);
            
            }
            
              shortAnswer&&console.log(shortAnswer);
          } else if (q.type === "M") {
            console.log("M");
            const existingAnswer = multiAnswer.find((a) => a.questionId === questionId);
            if (existingAnswer) {
            // 이미 해당 질문에 대한 답변이 있는 경우
            setMultiAnswer((prevMultiAnswer) =>
                prevMultiAnswer.map((a) =>
                a.questionId === questionId
                    ? { questionId: questionId, optionIds: answer}
                    : a
                )
            );
            }else{
                console.log("length",multiAnswer.length)
                // 해당 질문에 대한 답변이 없는 경우
                setMultiAnswer((prevMultiAnswer) => [
                    ...prevMultiAnswer,
                    { questionId: questionId, optionIds: answer},
                ]);
            
            }
            
              shortAnswer&&console.log(multiAnswer);
          } else if (q.type === "L") {
            console.log("L");
            const existingAnswer = longAnswer.find((a) => a.questionId === questionId);
            if (existingAnswer) {
            // 이미 해당 질문에 대한 답변이 있는 경우
            setLongAnswer((prevLongAnswer) =>
                prevLongAnswer.map((a) =>
                a.questionId === questionId
                    ? { questionId: questionId, answer: answer.target.value }
                    : a
                )
            );
            }else{
                console.log("length",longAnswer.length)
                // 해당 질문에 대한 답변이 없는 경우
                setLongAnswer((prevLongAnswer) => [
                    ...prevLongAnswer,
                    { questionId: questionId, answer: answer.target.value },
                ]);
            
            }
            
              longAnswer&&console.log(longAnswer);
          
          }
       
      };
    

    const CheckQuestionType=(q:any,index:number)=>{
        const [inputCount, setInputCount] = useState(0);
        const [optionList,setOptionList]=useState<string[]>([]);
        const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
        const handleCheckboxChange = (optionId: number) => {
            if (selectedOptions.includes(optionId)) {
              setSelectedOptions(selectedOptions.filter((item) => item !== optionId));
            } else {
              setSelectedOptions([...selectedOptions, optionId]);
            }
            console.log(selectedOptions);
        };
        useEffect(() => {
            if (q && selectedOptions.length > 0) {
                handleAnswerChange(q, selectedOptions);
              }
          }, [selectedOptions]);

        

        if(questions[index].type==="M"){
            //console.log("optionList",optionList);
            return(
                <div className="question-answer-container" >
                    <div className="question-number">
                        Q{index+1}
                    </div>
                    <div className="multi-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="checkbox-container">
                        {questions[index].options.map((o:any)=>{
                            return(
                            <div className="multi-option" key={o.optionId}>
                            <input id={o.optionId} type="checkbox" checked={selectedOptions.includes(o.optionId)} onChange={(e) => handleCheckboxChange(o.optionId)}/>
                            <label htmlFor={o.optionId}>{o.option}</label>
                        </div>)
                        
                        }

                        )}
                    </div>
                </div>
            )
            
        }else if(questions[index].type==="S"){
            //const [shortText,setShortText]=useState<string>('');
            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };
            return(
                <div className="question-answer-container">
                    <div className="question-number">
                        Q{index+1}
                    </div>
                    <div className="short-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="short-question-answer"> 
                        <div className="write-here">
                            
                            <input className="text-answer-input" type="text"  onChange={(e)=>{onInputHandler(e);handleAnswerChange(q,e)}} maxLength={50}/>
                            <div className="text-counter">{inputCount}/50 </div>
                        </div>
                    </div>
                </div>
                
            )

        }else if(questions[index].type==="L"){
           // const [longText,setLongText]=useState<string>('');
            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };
            return(
                <div className="question-answer-container">
                    <div className="question-number">
                        Q{index+1}
                    </div>
                    <div className="long-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="long-question-answer"> 
                        <div className="write-here">
                            ddd
                            <input className="text-answer-input" type="text"onChange={(e)=>{onInputHandler(e);handleAnswerChange(q,e)}} maxLength={500}/>
                            <div className="text-counter">{inputCount}/500 </div>
                        </div>
                    </div>
                </div>
            )
        }


    }
   //questions &&console.log(questions)

    //응답 저장
    


    // const TakeAnswer=()=>{
    //     if (questions && questions.length > 0) {
    //         console.log(questions);
    //         questions.map((q: any, index: number) => {
    //             //input 가져오기
                
    //           if (q.type === "S") {
    //             console.log("S");

    //           } else if (q.type === "M") {
    //             console.log("M");
    //           } else if (q.type === "L") {
    //             console.log("L");
    //           }
    //         });
    //       }
    // }
    
    const handelSubmit=()=>{
        const sortedShortAnswer = shortAnswer.sort((a, b) => a.questionId - b.questionId);
        const sortedLongAnswer = longAnswer.sort((a, b) => a.questionId - b.questionId);
        const sortedMultiAnswer = multiAnswer.sort((a, b) => a.questionId - b.questionId);
    
        console.log("short",sortedShortAnswer);
        console.log("multi",sortedMultiAnswer);
        const requestBody: FormAnswer = {
            multipleChoiceAnswers:sortedMultiAnswer,
            shortAnswerResponses:sortedShortAnswer,
           
        };

        console.log(requestBody);
        sformService
        .AnswerForm(4,1,requestBody).then((response)=>{
            const {isSuccess, message} = response;
            if (isSuccess) {
                console.log("생성에 성공하였습니다");
                // navigate("/sform/leader" + sform.id);
         
            } else {
                console.log("생성에 실패하였습니다");
                console.log(message);
        
            }
        });
        

    }
    
    
    return(
        <div>
        <div className="form-answer-container">
            <div className="form-information">
                <div className="form-title-container">
                    <div className="form-title">{forms?.title}</div>
                    <div className="form-content">{forms?.content}</div>
                </div>
                <div className="form-explain">
                    <div className="left-explain">
                        <span >작성자   </span>
                        <span >설문 기간  </span>
                        <span>익명 여부</span>
                    </div>
                    <div className="right-explain">
                        <span>채안나</span>
                        <span>{forms.startDate.substring(2,10)}~{forms.endDate.substring(2,10)}</span>
                        <span>{
                            forms.isAnonymous==="N"?
                            "실명":
                            "익명"
                                
                            }
                            
                        </span>
                    </div>
                    <div className="link-container">
                        링크 넣을것
                    </div>

                </div>
                
            </div>
            <div className="form-question-container">
                    {
                        
                        questions.map((q:any, index:number)=>{
                            return (CheckQuestionType(q,index));
                                
                        
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