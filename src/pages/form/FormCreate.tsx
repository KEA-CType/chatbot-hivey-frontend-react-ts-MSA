import "../../styles/formcreate.css"

import React, {useState, useEffect, ReactElement} from "react";
import ReactDOM from "react-dom";
import {useNavigate} from "react-router-dom";
import {useRecoilValue} from "recoil";

import {formIdState, spaceState} from "../../commons/Atom";
import {FormCreateRequest} from "../../commons/interfaces/commonInterface";
import Modal from "../../components/commons/Modal";
import SelectGroupForForm from "../../components/form/SelectGroupForForm";

import sformService from "../../apis/services/sformService";

import moment from "moment";
import {motion} from "framer-motion";

import DatePicker from "react-datepicker";
import {ko} from 'date-fns/esm/locale';
import "react-datepicker/dist/react-datepicker.css"

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
import radio_btn from "../../assets/btn_radio.png";

const FormCreate = () => {
    const formId = useRecoilValue(formIdState);
    const navigate = useNavigate();

    const [formTitle, setFormTitle] = useState("");
    const [content, setContent] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isAnonymous, setIsAnonymous] = useState('N'); //익명 아닌게 디폴트
    const [isMandatory, setIsMandatory] = useState('N');
    const [questionRequests, setQuestionRequests] = useState([{}]);

    const [imgSrc, setImgSrc] = useState(before);
    const [isClicked, setIsClicked] = useState(false);
    const dateNow = new Date();
    const today = dateNow.toISOString().slice(0, 10);

    const [participationStatus, setParticipationStatus] = useState(0);
    const [requireModalIsOpen, setRequireModalIsOpen] = useState(false);
    const [chooseGroupModalIsOpen, setChooseGroupModalIsOpen] = useState(false);

    const [groupList, setGroupList] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number[]>([]); //useState<number[]>([]);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const handleSelectComplete = (groupId: number[]) => {
        if (Array.isArray(groupId)) {
            groupId.forEach((id) => {
                if (!selectedGroupId.includes(id)) {
                    setSelectedGroupId((prevSelectedGroupId) => [...prevSelectedGroupId, id]);
                }
            });
            console.log("selectedGroupId:", selectedGroupId);
        } else {
            console.error("Invalid groupId:", groupId);
        }
        // setSelectedGroupId(updateGroupId);

        // console.log("selectedGroupId:", selectedGroupId);
        // You can perform any further actions using the selected groupId here
    };
    const space = useRecoilValue(spaceState);
    useEffect(() => {
        console.log("spaceId", space.id);
        sformService
            .GetAllGroupAndMemberList(space.id)//sform.id
            .then((response) => {
                const {code} = response;

                setGroupList(response.result);
                console.log("그룹", response.result)

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


    }, []);

    const anoyClick = () => {
        console.log("1", isClicked, imgSrc)
        if (isClicked) //
        {
            console.log("2-1", isClicked, imgSrc)
            setImgSrc(before);
            setIsClicked(false);
            setIsAnonymous('N')
            console.log("2-2", isClicked, imgSrc)
        } else {//초기 상태는 거짓 else 실행
            console.log("3-1", isClicked, imgSrc)
            setImgSrc(after);
            setIsClicked(true);
            setIsAnonymous('Y');
            console.log("3-2", isClicked)
        }
        console.log("DDD", isClicked);
    };
    const checkParticipationStatus = (participationStatus: number | boolean) => {

        let imgPath = "";
        if (participationStatus === 0) {
            return require_member
        }
        if (participationStatus === 1) {
            return every_mem
        }
        if (participationStatus === 2) {
            return check_mem
        }

    }
    const [timeModal, setTimeModal] = useState(false)
    const checkDate = () => {

        if (endDate <= startDate) {
            setTimeModal(true);
            console.log("안됨 start, end", startDate, endDate);
        } else {
            console.log("됨 start, end", startDate, endDate);
            ClickFinishBtn(questionRequests);
        }
    }


    const MakeMultipleChoiceQuestion = () => {
        const [radioOptions, setRadioOptions] = useState<string[]>([]);
        const [questionTitle, setQuestionTitle] = useState("");
        const [questionContent, setQuestionContent] = useState("");
        const [saveOption, setSaveOption] = useState<string []>([]);
        const [showButton, setShowButton] = useState(true);

        const handleAddRadioOption = () => {
            setRadioOptions((prevOptions) => [...prevOptions, '']);
        };

        const handleRadioOptionChange = (index: number, value: string) => {

            const updatedOptions = [...radioOptions];
            updatedOptions[index] = value;
            setRadioOptions(updatedOptions);

            const updatedSaveOption = [...saveOption];
            updatedSaveOption[index] = value;
            setSaveOption(updatedSaveOption);
        };

        const handleSaveQuestions = () => {
            const questionData = {
                type: "M",
                title: questionTitle,
                content: questionContent,
                options: saveOption
            };
            setQuestionRequests((prevRequests) => [...prevRequests, questionData]);
            setShowButton(false);
        };

        return (
            <div className="qusetion-container">
                <div className="question-title-containter-multiple">

                    <div className="question-title">
                        <input className="title-input" placeholder="질문 제목을 입력해 주세요."
                               value={questionTitle}
                               onChange={e => setQuestionTitle(e.target.value)}/></div>

                    <div className="question-explain">
                        <input className="explain-input" placeholder="질문 설명을 입력해 주세요."
                               value={questionContent} onChange={(e) => {
                            setQuestionContent(e.target.value)
                        }}/></div>

                </div>
                <div className="radio-container">
                    {radioOptions.map((option, index) => (
                        <div className="radio-line" key={index}>
                            <img src={radio_btn} className="radio-btn" alt="radio"/>
                            <input
                                className="radio-option"
                                type="text"
                                value={option}
                                onChange={(event) => handleRadioOptionChange(index, event.target.value)}
                                placeholder="질문 제목을 입력해 주세요."

                            />
                        </div>
                    ))}
                    <div className="radio-button-container">
                        <button className="add-radio-option" onClick={handleAddRadioOption}>질문 추가</button>
                        {showButton && <button className="save-question" onClick={handleSaveQuestions}>질문 저장</button>}
                    </div>

                </div>


            </div>

        )
    }
    const MakeShortAnswerQuestion = () => {
        // console.log("ShortQuestion")
        const [inputCount, setInputCount] = useState(0);
        const [questionTitle, setQuestionTitle] = useState("");
        const [questionContent, setQuestionContent] = useState("");
        const [showButton, setShowButton] = useState(true);
        const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputCount(event.target.value.length);
        };

        const handleRemoveQuestion = () => {
            // Find the parent div and remove it
            console.log("remove");
            const questionContainer = document.querySelector('.question-container');
        };

        const handleSaveQuestions = () => {
            const questionData = {
                type: "S",
                title: questionTitle,
                content: questionContent,
            };

            setQuestionRequests([questionData]);
            setShowButton(false);
        };

        return (

            <div className="qusetion-container">
                <div className="question-title-containter-short">

                    <div className="question-title">
                        <input className="title-input" placeholder="질문 제목을 입력해 주세요." value={questionTitle}
                               onChange={(e) => {
                                   setQuestionTitle(e.target.value)
                               }}/>
                    </div>

                    <div className="question-explain">
                        <input className="explain-input"
                               placeholder="질문 설명을 입력해 주세요."
                               value={questionContent} onChange={(e) => {
                            setQuestionContent(e.target.value)
                        }}/>
                    </div>

                </div>

                <div className="text-answer">

                    <div className="write-here">

                        <input className="text-answer-input" type="text" onChange={onInputHandler} maxLength={50}/>

                        <div className="text-counter">{inputCount}/50</div>

                        {showButton && <button className="save-question" onClick={handleSaveQuestions}>질문 저장</button>}

                    </div>

                </div>


            </div>
        )
    }

    const MakeLongAnswerQuestion = () => {
        const [inputCount, setInputCount] = useState(0);
        const [questionTitle, setQuestionTitle] = useState("");
        const [questionContent, setQuestionContent] = useState("");
        const [showButton, setShowButton] = useState(true);
        const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputCount(event.target.value.length);
        };
        const handleSaveQuestions = () => {
            const questionData = {
                type: "L",
                title: questionTitle,
                content: questionContent,

            };
            console.log(questionData);
            setQuestionRequests((prevRequests) => [...prevRequests, questionData]);
            setShowButton(false);
        };

        return (
            <div className="qusetion-container">
                <div className="question-title-containter-long">
                    <div className="question-title"><input className="title-input" placeholder="질문 제목을 입력해주세요"
                                                           value={questionTitle} onChange={(e) => {
                        {
                            setQuestionTitle(e.target.value)
                        }
                    }}/></div>
                    <div className="question-explain"><input className="explain-input" placeholder="질문 설명을 입력해주세요"
                                                             value={questionContent} onChange={(e) => {
                        {
                            setQuestionContent(e.target.value)
                        }
                    }}/></div>
                </div>
                <div className="text-answer">
                    <div className="write-here">
                        <input className="long-text-answer-input" type="text" onChange={onInputHandler}
                               maxLength={500}/>
                        <div className="text-counter">{inputCount}/500</div>
                        {showButton && <button className="save-question" onClick={handleSaveQuestions}>질문 저장</button>}
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


    const SendRequestBody = (questionRequests: any) => {

        const requestBody: FormCreateRequest = {
            title: formTitle,
            content: content,
            startDate: moment(startDate).format("YYYY-MM-DD"),
            endDate: moment(endDate).format("YYYY-MM-DD"),
            isAnonymous: isAnonymous,
            isMandatory: isMandatory,
            groups: selectedGroupId,
            questionRequests: questionRequests,
        };

        console.log(requestBody);

        sformService.CreateDetailedSurvey(formId, requestBody).then((response) => {
            const {isSuccess, message} = response;

            if (isSuccess) {
                console.log("생성에 성공하였습니다");
                console.log(formId);
                navigate(`/space/leader/${space.id}`);
            } else {
                console.log("생성에 실패하였습니다");
                console.log(message);
                console.log(requestBody.groups);
            }
        });
    };

    const ClickFinishBtn = (questionRequests: any) => {
        if (questionRequests.length > 1) {

            SendRequestBody(questionRequests);
        }
    };

    return (
        <div className="form-overall-container">
            <motion.div className="form-container" style={{y: 100}} animate={{y: 0}}>

                <img className="form-logo" src={logo} alt="logo"/>
                <div></div>

                {/* 설문 제목 */}
                <div className="title">
                    <span className="title-name">
                        <input className="survey-title-input"
                               placeholder="설문지 제목을 입력하세요."
                               onChange={(e) => {
                                   setFormTitle(e.target.value)
                               }}/>
                    </span>
                </div>

                {/* 설문 설명 */}
                <div className="survey-explain">
                    <input className="survey-explain-input" placeholder="설문지 설명을 입력하세요" onChange={(e) => {
                        setContent(e.target.value);
                    }}/>
                </div>

                {/* 설문 옵션 */}
                <div className="option-container">

                    <div className="top-option">
                        <img className="anoy" src={imgSrc} onClick={anoyClick} alt="anoy"/>

                        <img className="check-participant-img"
                             src={checkParticipationStatus(participationStatus)}
                             alt="require_member"
                             onClick={() => setRequireModalIsOpen(true)}/>

                        <Modal isOpen={requireModalIsOpen} onClose={() => setRequireModalIsOpen(false)}
                               header={"설문 필수 여부"}>
                            <div className="check-participant">

                                <img className="must" src={must_btn} onClick={() => {
                                    setParticipationStatus(1);
                                    setRequireModalIsOpen(false);
                                    setIsMandatory('Y');
                                }}/>

                                <img className="check" src={check_btn} onClick={() => {
                                    setParticipationStatus(2);
                                    setChooseGroupModalIsOpen(true)
                                }}/>

                            </div>
                        </Modal>

                        <Modal isOpen={chooseGroupModalIsOpen} onClose={() => setChooseGroupModalIsOpen(false)}
                               header={"설문 선택 참여"}>
                            <div className="choose-group">
                                <SelectGroupForForm groups={groupList} checkedGroupList={handleSelectComplete}
                                                    isOpen={setChooseGroupModalIsOpen}/>
                            </div>
                        </Modal>

                    </div>

                    <div className="left-option">

                        <div className="start-date-container">
                            <img className="start-date-img" src={start_date} alt="startDate"></img>
                            <DatePicker className="startDatePicker"
                                        locale={ko}
                                        dateFormat="yyyy.MM.dd"
                                        selected={startDate}
                                        onChange={(date: Date) => setStartDate(date)}
                                        selectsStart
                                        minDate={new Date()}
                                        startDate={startDate}
                                        endDate={endDate}/>
                        </div>

                        <div className="end-date-container">
                            <img className="end-date-img" src={end_date} alt="endDate"></img>
                            <DatePicker className="endDatePicker"
                                        locale={ko}
                                        dateFormat="yyyy.MM.dd"
                                        selected={endDate}
                                        startDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null}
                                        onChange={(date: Date) => setEndDate(date)}
                                        selectsEnd
                                        minDate={startDate ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000) : null}
                                        endDate={endDate}/>
                        </div>

                        <Modal isOpen={timeModal} onClose={() => setTimeModal(false)} header={"설문 날짜 확인"}>
                            설문 시작 시간과 종료 시간을 확인해 주세요.
                        </Modal>

                    </div>

                </div>

            </motion.div>

            {/* 설문 질문 생성 */}
            <div className="question-create-container">

                <div className="questions">
                    {MakeShortAnswerQuestion()}
                    {MakeMultipleChoiceQuestion()}
                </div>

                <div className="create-menu-container">
                    <div className="create-menu">
                        <img className="multiple_choice_img" src={multipleChoice} alt="multipleChoice"
                             onClick={() => handleAddQuestion(<MakeMultipleChoiceQuestion/>)}/>
                        <img className="short_answer_img" src={shortAnswer} alt="short"
                             onClick={() => handleAddQuestion(<MakeShortAnswerQuestion/>)}/>
                        <img className="long_answer_img" src={longAnswer} alt="long"
                             onClick={() => handleAddQuestion(<MakeLongAnswerQuestion/>)}/>
                    </div>
                </div>

            </div>

            <div className="button-container">
                <button className="finish-btn" onClick={checkDate}>완료</button>
                <button className="cancel-btn" onClick={() => navigate(-1)}>취소</button>
            </div>

        </div>
    );
};

export default FormCreate;
