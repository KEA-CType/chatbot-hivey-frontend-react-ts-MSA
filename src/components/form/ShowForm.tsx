import React, {useState, useEffect, ReactElement,useContext} from "react";


const ShowForm=({forms}: any)=>{
    const questions=forms.questions;
    
    

    const CheckQuestionType=(index:number)=>{
        const [inputCount, setInputCount] = useState(0);
        const [optionList,setOptionList]=useState<string[] | undefined>();
        const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
        useEffect(() => {
            if (questions[index].type === "M") {
              setOptionList(questions[index].options);
            }
          }, [index]);

        const handleCheckboxChange = (option: string) => {
            if (selectedOptions.includes(option)) {
              setSelectedOptions(selectedOptions.filter((item) => item !== option));
            } else {
              setSelectedOptions([...selectedOptions, option]);
            }
            console.log(selectedOptions);
        };

        if(optionList&&questions[index].type==="M"){
            console.log("optionList",optionList);
            return(
                <div className="question-container">
                    <div className="question-number">
                        Q{questions[index].questionId}
                    </div>
                    <div className="multi-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="checkbox-container">
                        {questions[index].options.map((o:any)=>{
                            return(
                            <div className="multi-option" key={o.optionId}>
                            <input id={o.optionId} type="checkbox" checked={selectedOptions.includes(o.option)} onChange={() => handleCheckboxChange(o.option)}/>
                            <label htmlFor={o.optionId}>{o.option}</label>
                        </div>)
                        
                        }

                        )}
                    </div>
                </div>
            )
            return null;
        }else if(questions[index].type==="S"){
            
            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };
            return(
                <div className="question-container">
                    <div className="question-number">
                        Q{questions[index].questionId}
                    </div>
                    <div className="short-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="short-question-answer"> 
                        <div className="write-here">
                            
                            <input className="text-answer-input" type="text" onChange={onInputHandler} maxLength={50}/>
                            <div className="text-counter">{inputCount}/50 </div>
                        </div>
                    </div>
                </div>
                
            )

        }else if(questions[index].type==="L"){
            const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
                setInputCount(event.target.value.length);
            };
            return(
                <div className="question-answer-container">
                    <div className="question-number">
                        Q{questions[index].questionId}
                    </div>
                    <div className="long-question">
                        <div className="question-answer-title">{questions[index].title}</div>
                        <div className="question-answer-explain">{questions[index].content}</div>
                    </div>
                    <div className="long-question-answer"> 
                        <div className="write-here">
                            <div className="text-counter">{inputCount}/500 </div>
                            <input className="text-answer-input" type="text" onChange={onInputHandler} maxLength={500}/>
                            
                        </div>
                    </div>
                </div>
            )
        }


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
                        forms.questions.map((q:any, index:number)=>{
                            return (CheckQuestionType(index));
                                
                        
                        })
                    }

                </div>
        </div>
        <div className="button-container">
            <button className="submit-button">제출</button>
            <button className="cancel-button">초기화</button>
        </div>
        </div>
     
    )
}

export default ShowForm;