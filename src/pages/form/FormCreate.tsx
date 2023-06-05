import "../../styles/formcreate.css"


import formService from "../../services/form/form";
import spaceGroup from "../../services/space/spaceGroup";
import groupMember from "../../services/space/spaceMember";

import GroupMemberList from "../../components/space/GroupMemberList";
import { FormCreateRequest } from "../../commons/Interface";

import React, {useState, useEffect, ReactElement,useContext} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {formIdState,userState, spaceState} from "../../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";
import Modal from  "../../components/commons/modals";
import SelectGroupForForm from "../../components/form/SelectGroupForForm";
import moment from "moment";
import ReactDOM from "react-dom";



// 달력을 위해서
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css"

//img
import logo from "../../assets/ic_logo_hivey.png"
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
import { ListFormat } from "typescript";


const FormCreate = () => {
    const formId=useRecoilValue(formIdState);
    const navigate = useNavigate();
    // console.log(`formId: ${formId}`)
    //api 6.2에 필요한 것
    const [formTitle,setFormTitle]=useState("");
    const [content,setContent]=useState("");
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [isAnonymous,setIsAnonymous]=useState('N'); //익명 아닌게 디폴트
    const [isMandatory,setIsMandatory]=useState('N');
    // const [requestBody,setRequestBody]=useState<FormCreateRequest>();
        //const [questionGroups,setQuestionGroups]=useState([]);
        const [questions,setQuestions]=useState([{}]);
            const [forQuestionId,setForQuestionId]=useState(0);
    //         const [questionType,setQuestionType]=useState("");
    //         const [questionTitle,setQuestionTitle]=useState("");
    //         const [questionContent,setQuestionContent]=useState("");
    //         const [questionOptions,setQuestionOptions]=useState<null|String>();
   
    
    const [imgSrc,setImgSrc]=useState(before);
    const [isClicked, setIsClicked] = useState(false);
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);
    
    
    const [participationStatus,setParticipationStatus]=useState(0);
    const [requireModalIsOpen, setRequireModalIsOpen] = useState(false);
    const [chooseGroupModalIsOpen, setChooseGroupModalIsOpen]=useState(false);

   

    
   
    //그룹 목록 불러오기
    const [groupList,setGroupList]=useState([]);
    const [selectedGroupId,setSelectedGroupId]=useState<number[]>([]); //useState<number[]>([]);
    const handleSelectComplete = (groupId: number[]) => {
        if (Array.isArray(groupId)) { // groupId가 배열인지 확인
            setSelectedGroupId(prevSelectedGroupId => [...prevSelectedGroupId, ...groupId]);
            console.log("selectedGroupId:", selectedGroupId);
          } else {
            console.error("Invalid groupId:", groupId);
          }
        // setSelectedGroupId(updateGroupId);
       
        // console.log("selectedGroupId:", selectedGroupId);
        // You can perform any further actions using the selected groupId here
      };
    const space=useRecoilValue(spaceState);
    useEffect(()=>{
        spaceGroup
        .GetAllGroupAndMemberList(space.id)
        .then((response) => {
            const {code} = response;

            setGroupList(response.result);
            console.log("그룹",response.result)

            if (code === 1000) {
                console.log(groupList);
                console.log("그룹 목록과 멤버 목록을 불러오는 데 성공했습니다.");
            } else {
                console.log("그룹 목록과 멤버 목록을 불러오는 데 실패하였습니다.");
            }

        })
        .catch((error) => {
            console.log(error);
        });

       
    },[]);
    
   
     

    
           
    
    const anoyClick = () => {
        console.log("1",isClicked,imgSrc)
        if(isClicked) //
        {   console.log("2-1",isClicked,imgSrc)
            setImgSrc(before);
            setIsClicked(false);
            setIsAnonymous('N')
            console.log("2-2",isClicked,imgSrc)
        } else{//초기 상태는 거짓 else 실행
            console.log("3-1",isClicked,imgSrc)
            setImgSrc(after);
            setIsClicked(true);
            setIsAnonymous('Y');
            console.log("3-2",isClicked)
        }
        console.log("DDD",isClicked);
    };
    const checkParticipationStatus=(participationStatus: number | boolean)=>{

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
        const [questionTitle,setQuestionTitle]=useState("");
        const [questionContent,setQuestionContent]=useState("");
        const [saveOption, setSaveOption] = useState<{options: string }[]>([]);

        const handleAddRadioOption = () => {
            setRadioOptions((prevOptions) => [...prevOptions, '']);
        };
        const handleRadioOptionChange = (index:number,value: string) => {
            
            
            const updatedOptions = [...radioOptions];
            updatedOptions[index] = value;
            setRadioOptions(updatedOptions);

            const updatedSaveOption = [...saveOption];
            updatedSaveOption[index] = { options: value };
            setSaveOption(updatedSaveOption);
            
            console.log(radioOptions);
            
            
        };
        
          
        return(
            <div className="qusetion-container">
                   <div className="question-title-containter-multiple">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요" value={questionTitle} onChange={e => setQuestionTitle(e.target.value)}/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요" value={questionContent} onChange={(e)=>{{setQuestionContent(e.target.value)}}}/></div>
                    </div>
                    <div className="radio-container">
                {radioOptions.map((option, index) => (
                <div className="radio-line" key={index}>
                    <img src={radio_btn} className="radio-btn" alt="radio" />
                    <input
                    className="radio-option"
                    type="text"
                    value={option}
                    onChange={(event) => handleRadioOptionChange(index, event.target.value)}
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
        // console.log("ShortQuestion")
        const [inputCount, setInputCount] = useState(0);
        const [questionTitle,setQuestionTitle]=useState("");
        const [questionContent,setQuestionContent]=useState("");
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
            
            <div  className="qusetion-container" id="">
                    <div className="question-title-containter-short">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요" value={questionTitle} onChange={(e)=>{{setQuestionTitle(e.target.value)}}}/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요" value={questionContent} onChange={(e)=>{{setQuestionContent(e.target.value)}}}/></div>
                        
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
        const [questionTitle,setQuestionTitle]=useState("");
        const [questionContent,setQuestionContent]=useState("");
        const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputCount(event.target.value.length);
        };
        
        return(
            <div  className="qusetion-container">
                    <div className="question-title-containter-long">
                        <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요" value={questionTitle} onChange={(e)=>{{setQuestionTitle(e.target.value)}}}/></div>
                        <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요" value={questionContent} onChange={(e)=>{{setQuestionContent(e.target.value)}}}/></div>
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

      

      const ClickFinishBtn=()=>{
       
        let questionId=0;
        console.log(forQuestionId);
        var options:string[]|null;
        var questionTitles:string;
        var questionContents:string;
        const newQuestions :{ questionId: number; type: string; title: string; content: string; options:string[]|null }[] = []
        // const newOptions :{

        // }
        const questionContainers = document.querySelectorAll('.qusetion-container');
        questionContainers.forEach((container) => {
            const childDiv = container.querySelector(':scope > div'); // Select the immediate child div
            
            let questionType=" ";
            questionId=questionId+1;
            console.log("childDiv",childDiv)
            if(childDiv){
                const className = childDiv.className;
                console.log("classname",className);
                    if (className.includes('multiple')) {
                        questionType="M";                                                                                                       //.map((optionElement) => optionElement.value);
                        const questionOptions = Array.from(document.querySelectorAll<HTMLInputElement>('.qusetion-container .radio-option'))
                        const options: string[] = [];
                        questionOptions.forEach((optionElement: HTMLInputElement) => {
                            
                            console.log(optionElement);
                            options.push(optionElement.value);
                          });
                        console.log("options",options);
                        
                        // const options: string[] = questionOptions.map((optionElement: HTMLInputElement) => optionElement.value);
                        // console.log("options", options);
                        

                        const questionTitleElement = container.querySelector<HTMLInputElement>('.title-input')
                        questionTitles = questionTitleElement ? questionTitleElement.value : '';
            
                        const questionContentElement = container.querySelector<HTMLInputElement>('.explain-input');
                        questionContents = questionContentElement ? questionContentElement.value : '';
                        
                        newQuestions.push({
                            questionId: questionId,
                            type: questionType,
                            title: questionTitles || '',
                            content: questionContents || '',
                            options:options || null,
                          });

                    } else if (className.includes('short')) {
                        questionType = "S";
                        options=null;
                        const questionTitleElement = container.querySelector<HTMLInputElement>('.title-input')
                        questionTitles = questionTitleElement ? questionTitleElement.value : '';
            
                        const questionContentElement = container.querySelector<HTMLInputElement>('.explain-input');
                        questionContents = questionContentElement ? questionContentElement.value : '';
                       
                        newQuestions.push({
                            questionId: questionId,
                            type: questionType,
                            title: questionTitles || '',
                            content: questionContents || '',
                            options:options || null,
                          });

                    } else if (className.includes('long')) {
                        questionType = "L";
                        options=null;
                        const questionTitleElement = container.querySelector<HTMLInputElement>('.title-input')
                        questionTitles = questionTitleElement ? questionTitleElement.value : '';
            
                        const questionContentElement = container.querySelector<HTMLInputElement>('.explain-input');
                        questionContents = questionContentElement ? questionContentElement.value : '';
                        newQuestions.push({
                            questionId: questionId,
                            type: questionType,
                            title: questionTitles || '',
                            content: questionContents || '',
                            options:options || null,
                          });
                        
                    }
                }

            // const questionTitleElement = container.querySelector<HTMLInputElement>('.title-input')
            // const questionTitles = questionTitleElement ? questionTitleElement.value : '';

            // const questionContentElement = container.querySelector<HTMLInputElement>('.explain-input');
            // const questionContents = questionContentElement ? questionContentElement.value : '';
            
            // const questionOptionElement=container.querySelector<HTMLInputElement>('.radio-option')
            // const questionOption=questionOptionElement ? questionOptionElement.value:"";


            
              
            });
            options=[];
            
            console.log(selectedGroupId);
            
            setQuestions(newQuestions);
            console.log("questions",questions);
            //console.log(radioOptions);
            
            
            
      };
      useEffect(()=>{
        if(questions.length>1){
            SendRequestBody(questions);
        }
        },questions)

      const SendRequestBody=(questions:any)=>{
        var title:string;
        //const [requestBody,setRequestBody]=useState<FormCreateRequest>();
        
        //const RequestBody :{ title: string; content: string; startDate:Date|string; endDate:Date|string; isAnonymous:string; isMandatory:string; groups:number[]|undefined; questionRequests:object[] }
        const formContainers = document.querySelectorAll('.form-container');
        formContainers.forEach((container)=>{
            const formTitleElement=container.querySelector<HTMLInputElement>('.survey-title-input');
            title=formTitleElement ? formTitleElement.value: '';

            const requestBody:FormCreateRequest={
                title: title,
                content: content,
                startDate: moment(startDate).format("YYYY-MM-DD"),
                endDate: moment(endDate).format("YYYY-MM-DD") ,
                isAnonymous: isAnonymous,
                isMandatory: isMandatory,
                groups:selectedGroupId,
                questionRequests:questions,
            }
            console.log(requestBody);
            formService
        .CreateDetailedSurvey(formId,requestBody)
        .then((response)=>{
            const {isSuccess, message} = response;

            if(isSuccess){
                
                console.log("생성에 성공하였습니다")
                navigate(-1);

            }else{
                console.log("생성에 실패하였습니다")
                console.log(message)
                console.log(requestBody.groups);
                
            }
        })

        })
        
       
        //groups 빈 배열이여도 postman 성공으로 뜸
        
      }




    return(
        <div>
            <div className="form-container" >
                <img className="form-logo" src={logo} alt="logo"/>
                <div></div>
                <div className="title">
                <span className="title-name"><input className="survey-title-input" placeholder="설문지 제목을 입력하세요" onChange={(e) => {{setFormTitle(e.target.value);}}}/></span>
                </div>
                <div className="survey-explain">
                <input className="survey-explain-input" placeholder="설문지 설명을 입력하세요" onChange={(e) => {{setContent(e.target.value);}}}/>
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
                                <img className="must" src={must_btn} onClick={()=>{setParticipationStatus(1);setRequireModalIsOpen(false);setIsMandatory('Y');}}/>          
                                <img className="check" src={check_btn} onClick={()=>{setParticipationStatus(2);setChooseGroupModalIsOpen(true)}}/>
                            </div>
                        </Modal>
                        <Modal  isOpen={chooseGroupModalIsOpen} onClose={()=>setChooseGroupModalIsOpen(false)}>
                        {/* 그룹이름 나오게 하는 건 list 사용할 듯 */}
                        <div className="choose-group">
                                
                            <SelectGroupForForm groups={groupList} checkedGroupList={handleSelectComplete}/>
                        
                            
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
                <button className="finish-btn" onClick={ClickFinishBtn}>완료</button>
                <button className="cancel-btn" onClick={()=>navigate(-1)}>취소</button>
            </div>
        </div>
    )
}
//startdate enddate 비교해서 경고 날리기

export default FormCreate;

