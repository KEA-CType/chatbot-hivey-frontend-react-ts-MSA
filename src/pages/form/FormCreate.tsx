import "../../styles/formcreate.css"

import React, {useState, useEffect, ReactElement} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {userState, spaceState} from "../../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";
import Modal from  "../../components/commons/modals";
import ReactDOM from "react-dom";


// 달력을 위해서
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css"
import logo from "../../assets/ic_logo_hivey.png";

import before from "../../assets/btn_anonymous_before_click.png";
import after from "../../assets/btn_anonymous_after_click.png";
import start_date from "../../assets/ic_form_start_date.png";
import end_date from "../../assets/ic_form_end_date.png";
import require_member from "../../assets/btn_required_member.png";
import must_btn from "../../assets/btn_must_participation.png";
import check_btn from "../../assets/btn_check_participation.png";
import every_mem from "../../assets/ic_every_member.png";
import check_mem from "../../assets/ic_check_member.png";
import multipleChoice from "../../assets/btn_multiple_choice.png";
import shortAnswer from "../../assets/btn_short_answer.png";
import longAnswer from "../../assets/btn_long_answer.png";
import remove_btn from "../../assets/btn_remove_question.png";
import radio_btn from "../../assets/btn_radio.png";




const FormCreate = () => {
    //api 6.2에 필요한 것
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isAnonymous,setIsAnonymous]=useState(false);
    const [isMandatory,setIsMandatory]=useState(false);
    const [questionGroups,setQuestionGroups]=useState([]);
    const [questionRequests,setQuestionRequests]=useState([]);

    const [imgSrc,setImgSrc]=useState(before);
    const [isClicked, setIsClicked] = useState(false);
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);
    
    
    const [participationStatus,setParticipationStatus]=useState(0);
    const [requireModalIsOpen, setRequireModalIsOpen] = useState(false);
    const [chooseGroupModalIsOpen, setChooseGroupModalIsOpen]=useState(false);
    
    
    const anoyClick = () => {
        console.log("1",isClicked,imgSrc)
        if(isClicked) //
        {   console.log("2-1",isClicked,imgSrc)
            setImgSrc(before);
            setIsClicked(false);
            console.log("2-2",isClicked,imgSrc)
        } else{//초기 상태는 거짓 else 실행
            console.log("3-1",isClicked,imgSrc)
            setImgSrc(after);
            setIsClicked(true);
            console.log("3-2",isClicked)
        }
        console.log("DDD",isClicked);
    };
    const  checkParticipationStatus=(participationStatus: number | boolean)=>{

        let  imgPath="";
        if(participationStatus===0){
            return require_member
        }
        if(participationStatus===1){
            
                return every_mem
        }
        if(participationStatus===2){
            return check_mem
        }
        
    }

   
    
    const MakeMultipleChoiceQuestion=()=>{
        const [radioOptions, setRadioOptions] = useState<string[]>([]);

        const handleAddRadioOption = () => {
            setRadioOptions((prevOptions) => [...prevOptions, '']);
        };
        const handleRadioOptionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
            const updatedOptions = [...radioOptions];
            updatedOptions[index] = event.target.value;
            setRadioOptions(updatedOptions);
          };
        return(
            <div className="qusetion-container">
                   <div className="question-title-containter">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요"/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요"/></div>
                    </div>
                    <div className="radio-container">
                {radioOptions.map((option, index) => (
                <div className="radio-line" key={index}>
                    <img src={radio_btn} className="radio-btn" alt="radio" />
                    <input
                    className="radio-option"
                    type="text"
                    value={option}
                    onChange={(event) => handleRadioOptionChange(index, event)}
                    placeholder="질문 제목을 입력해주세요"
                    />
                </div>
                ))}
                <div className="add-radio-option" onClick={handleAddRadioOption}>
                질문 추가
                </div>
                </div>
                
    </div>
            
        )
    }
    const MakeShortAnswerQuestion=()=>{
        console.log("ShortQuestion")
        const [inputCount, setInputCount] = useState(0);

        const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputCount(event.target.value.length);
        };
        const handleRemoveQuestion = () => {
            // Find the parent div and remove it
            console.log("remove");
            const questionContainer = document.querySelector('.question-container');
            // if (questionContainer && questionContainer.parentNode) {
            //     console.log("removed");
            //   questionContainer.parentNode.removeChild(questionContainer);
            // }

          };
        
        return(
            
            <div  className="qusetion-container">
                    <div className="question-title-containter">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요"/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요"/></div>
                    </div>
                    <div className="text-answer">
                        <div className="write-here">
                        <div className="text-counter">{inputCount}/50 </div>
                        <input className="text-answer-input" type="text" onChange={onInputHandler} maxLength={50}/>
                        <img src={remove_btn} alt="remove" onClick={handleRemoveQuestion}/>
                        </div>
                       

                    </div>
                    
                </div>
            
            
        )
    }

    const MakeLongAnswerQuestion=()=>{
        const [inputCount, setInputCount] = useState(0);

        const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputCount(event.target.value.length);
        };
        
        return(
            <div  className="qusetion-container">
                    <div className="question-title-containter">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요"/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요"/></div>
                    </div>
                    <div className="text-answer">
                        <div className="write-here">
                        <input className="long-text-answer-input" type="text" onChange={onInputHandler} maxLength={500}/>
                        <div className="text-counter">{inputCount}/500</div>
                        </div>


                    </div>
                </div>
            
        )
    }
    //react 요소인 질문 유형을 props로 받아서 복사 후 div 추가
    const handleAddQuestion = (questionType: ReactElement) => {
        const rootDiv = document.querySelector('.questions');
    
        if (rootDiv) {
          const newQuestion = React.cloneElement(questionType);
          const newQuestionNode = document.createElement('div');
    
          ReactDOM.render(newQuestion, newQuestionNode);
          rootDiv.appendChild(newQuestionNode);
        }
      };
      //question 삭제
  
    
    return(
        <div>
            <div className="form-container">
                <img className="form-logo" src={logo} alt="logo"/>
                <div></div>
                <div className="title">
                <span className="title-name"><input className="survey-title-input" placeholder="설문지 제목을 입력하세요"/></span>
                </div>
                <div className="survey-explain">
                <input className="survey-explain-input" placeholder="설문지 설명을 입력하세요"/>
                </div>
                <div className="option-container">
                    
                    <div className="left-option">                    
                    <img className="anoy" src={imgSrc} onClick={anoyClick} alt="anoy"/>
                        <div className="start-date-container">
                            <img src={start_date} alt="startDate"></img>
                            <DatePicker className="startDatePicker"
                                locale={ko}
                                dateFormat="yyyy.MM.dd"
                                selected={startDate}
                                onChange={(date:Date) => setStartDate(date)}
                                selectsStart 
                                minDate={new Date()}
                                startDate={startDate}
                                endDate={endDate}  
                            />
                            </div>
                        <div className="end-date-container">
                            <img src={end_date} alt="endDate"></img>
                                <DatePicker className="endDatePicker"
                                    locale={ko}
                                    dateFormat="yyyy.MM.dd"
                                    selected={endDate}
                                    startDate={startDate}
                                    onChange={(date:Date) => setEndDate(date)}
                                    selectsEnd
                                    minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null}
                                    
                                    endDate={endDate}  
                                />
                        </div>
                        
                    </div>
                    <div className="right-option">
                        
                        <img src={checkParticipationStatus(participationStatus)}  alt="require_member" onClick={()=>setRequireModalIsOpen(true)}/>
                        <Modal isOpen={requireModalIsOpen} onClose={()=>setRequireModalIsOpen(false)}>
                            <div className="check-participant">
                                <img className="must" src={must_btn} onClick={()=>{setParticipationStatus(1);setRequireModalIsOpen(false)}}/>          
                                <img className="check" src={check_btn} onClick={()=>{setParticipationStatus(2);setChooseGroupModalIsOpen(true)}}/>
                            </div>
                        </Modal>
                        <Modal isOpen={chooseGroupModalIsOpen} onClose={()=>setChooseGroupModalIsOpen(false)}>
                        {/* 그룹이름 나오게 하는 건 list 사용할 듯 */}
                        <div className="choose-group">
                            <div className="group-name-container">
                                <button className="group-name-btn">default group</button>
                                <button className="group-name-btn">group name</button>
                            </div>
                            <div className="group-member-container">
                                <button className="member-name-btn">member name</button>
                                <button className="member-name-btn">member name</button>
                            </div>
                        </div>
                        </Modal>
                    </div>
                    
                
                </div>
                

            </div>
            <div className="question-create-container">
                <div className="questions">
                {MakeShortAnswerQuestion()}
                {MakeMultipleChoiceQuestion()}
                </div>
                <div className="create-menu-container">
                    <div className="create-menu">
                        <img src={multipleChoice} alt="multipleChoice" onClick={()=>handleAddQuestion(<MakeMultipleChoiceQuestion/>)}/>
                        <img src={shortAnswer} alt="short" onClick={()=>handleAddQuestion(<MakeShortAnswerQuestion/>)} />
                        <img src={longAnswer} alt="long" onClick={()=>handleAddQuestion(<MakeLongAnswerQuestion/>)} />
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="finish-btn">완료</button>
                <button className="cancel-btn">취소</button>
            </div>
        </div>
    )
}
//startdate enddate 비교해서 경고 날리기

export default FormCreate;
