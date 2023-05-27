import "../../styles/formcreate.css"

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {userState, spaceState} from "../../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";
import Modal from  "../../components/commons/modals";



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

const FormCreate = () => {
    const [imgSrc,setImgSrc]=useState(before);
    const [isClicked, setIsClicked] = useState(false);
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [participationStatus,setParticipationStatus]=useState(0);
    const [requireModalIsOpen, setRequireModalIsOpen] = useState(false);
    const [chooseGroupModalIsOpen, setChooseGroupModalIsOpen]=useState(false);
    const [questionId,setQuestionId]=useState(0);
    let [inputCount, setInputCount] = useState(0);
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
    
    const makeMultipleChoiceQuestion=()=>{
        return(
            <div className="qusetion-container">
                    <div className="question-title">
                        객관식
                        <span className="question-explain">질문 설명</span>
                    </div>
                    ddd
                </div>
            
        )
    }
    const makeShortAnswerQuestion=()=>{
        return(
            <div className="qusetion-container">
                    <div className="question-title">
                        <p>단답식</p>
                        <span className="question-explain">질문 설명</span>
                    </div>
                    <div>
                    <input type="text" onChange={onInputHandler} maxLength={50} />
                    <p>
                        <span>{inputCount}</span> 
                        <span>/50</span>
                    </p>
        
                    ddd
                    </div>
                </div>
            
        )
    }

    const makeLongAnswerQuestion=()=>{
        return(
            <div className="qusetion-container">
                    <div className="question-title">
                        <p>주관식</p>
                        <span className="question-explain">질문 설명</span>
                    </div>
                    <div>
                    <input type="text" onChange={onInputHandler} maxLength={500} />
                    <p>
                        <span>{inputCount}</span>
                        <span>/500</span>
                    </p>
        
                    ddd
                    </div>
                </div>
            
        )
    }
    
    const onInputHandler = (e: React.ChangeEvent<any>) => {
        setInputCount(e.target.value.length);
      };

    
    return(
        <div>
            <div className="form-container">
                <img className="form-logo" src={logo} alt="logo"/>
                <div></div>
                <div className="title">
                <span className="title-name">설문지 제목</span>
                </div>
                <div className="survey-explain">
                설명
                </div>
                <div className="option-container">
                    
                    <div className="left-option">                    
                    <img className="anoy" src={before} onClick={anoyClick} alt="anoy"/>
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
                                    onChange={(date:Date) => setEndDate(date)}
                                    selectsEnd
                                    minDate={startDate}
                                    // startDate={startDate}
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
                {makeShortAnswerQuestion()}
                {makeShortAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                {makeLongAnswerQuestion()}
                </div>
                <div className="create-menu-container">
                    <div className="create-menu">
                        ddddd
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default FormCreate;
