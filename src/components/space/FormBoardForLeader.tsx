/**
 * 스페이스의 모든 설문 목록을 보여주는 부분
 */

import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import icFormboardDone from "../../assets/ic_formboard_done.png";
import icFormboardInprogress from "../../assets/ic_formboard_inprogress.png";
import icFormboardNotstarted from "../../assets/ic_formboard_notstarted.png";
import icCheckCircleGreen from "../../assets/ic_check_circle_green.png";
import icKebabBlack from "../../assets/ic_kebab_black.png";
import {useSetRecoilState} from "recoil";
import {formIdState, selectedFormIdState} from "../../commons/Atom";

const FormListComponent = ({forms}: any) => {
    const [formsByStatus, setFormsByStatus] = useState(Array);
    const setFormId = useSetRecoilState(formIdState);
    const setSelectedFormId = useSetRecoilState(selectedFormIdState);

    const navigate = useNavigate();

    useEffect(() => {

        console.log(`FormListComponent/forms: ${JSON.stringify(forms)}`);

        const formList = forms.map(
            (f: any) => {

                /**
                 * 설문을 클릭했을 때 해당 설문으로 이동한다.
                 */
                const onClickForm = (e: any) => {
                    e.preventDefault();

                    setFormId(f.formId);
                    navigate("/form");
                };

                /**
                 * 설문 설정 버튼을 클릭했을 때 설정을 띄워준다.
                 * 설정으로는 참여 현황 보기, 설문 결과 보기가 있다.
                 */
                const onClickKebab = (e: any) => {
                    // 아래 함수를 실행시켜야 제대로 드롭 다운 메뉴가 열리는 걸 확인할 수 있다.
                    e.stopPropagation();

                    let kebab = document.getElementById("formboard-form-kebab-menu") as HTMLElement;

                    if (kebab.style.display === "none") {
                        kebab.style.display = "block";
                    } else {
                        kebab.style.display = "none";
                    }
                }

                /**
                 * 참여 현황 보기를 클릭했을 때 클릭한 설문 식별 번호를 저장한다.
                 */
                const onClickFirstMenuItem = (e: any) => {
                    e.preventDefault();
                    setSelectedFormId(f.formId);
                    console.log(`선택한 설문 식별 번호: ${f.formId}`);
                }

                return (
                    <div key={f.formId} className="formboard-form" onClick={onClickForm}>

                        {/* FIXME: 나중에 (참여 여부, 타겟 여부에 따라서) 분기 처리 추가하기 */}
                        <div className="formboard-form-icon-wrapper">
                            <img className="formboard-form-icon-img" src={icCheckCircleGreen} alt=""/>
                        </div>

                        <div className="formboard-form-information">
                            <div className="formboard-form-information-title">설문 제목</div>
                            <div className="formboard-form-information-date">~ 2023.05.27 (토)</div>
                        </div>

                        <div className="formboard-form-kebab-wrapper" onClick={onClickKebab}>
                            <img className="formboard-form-kebab-img" src={icKebabBlack} alt=""/>
                            <div id="formboard-form-kebab-menu" className="formboard-form-kebab-menu"
                                 style={{display: "none"}}>
                                <div className="formboard-form-kebab-menu-item" onClick={onClickFirstMenuItem}>참여 현황 보기</div>
                                <Link to="/form/response">
                                    <div className="formboard-form-kebab-menu-item">설문 결과 보기</div>
                                </Link>
                            </div>
                        </div>
                    </div>

                );
            });

        setFormsByStatus(formList);

    }, [forms])

    return <>{formsByStatus}</>;
}

const FormBoardForLeader = ({forms}: any) => {

    const [inProgressForms, setInProgressForms] = useState(Array);
    const [notStartedForms, setNotStartedForms] = useState(Array);
    const [doneForms, setDoneForms] = useState(Array);

    useEffect(() => {

        // 현재 날짜를 구한 후 in progress, not started, done으로 구분하여 저장한다.
        let today = new Date();

        // In progress
        let filteredForms = Array.isArray(forms) ? forms.filter(
            (f: any) => {
                const startDate = new Date(f.startDate);
                const endDate = new Date(f.endDate);

                return today >= startDate && today <= endDate;
            }) : [];

        setInProgressForms(filteredForms);
        console.log(`inProgress: ${JSON.stringify(filteredForms)}`);

        // Not started
        filteredForms = Array.isArray(forms) ? forms.filter(
            (f: any) => {
                const startDate = new Date(f.startDate);

                return today < startDate;
            }) : [];

        setNotStartedForms(filteredForms);

        // Done
        filteredForms = Array.isArray(forms) ? forms.filter(
            (f: any) => {
                const startDate = new Date(f.startDate);
                const endDate = new Date(f.endDate);

                return today >= startDate && today > endDate;
            }) : [];

        setDoneForms(filteredForms);

    }, [forms])

    return (
        <div className="formboard-rectangle-white">

            <div className="formboard-title">Board</div>

            <div className="formboard-box">

                {/* Inprogress */}
                <div className="formboard-status-container" style={{marginLeft: "2%", marginRight: "1%"}}>
                    <div className="formboard-status-title-wrapper">
                        <img className="formboard-status-title" src={icFormboardInprogress} alt=""/>
                    </div>
                    <div className="formboard-status-box">
                        <FormListComponent forms={inProgressForms}/>
                    </div>
                </div>

                {/* Not started */}
                <div className="formboard-status-container">
                    <div className="formboard-status-title-wrapper">
                        <img className="formboard-status-title" src={icFormboardNotstarted} alt=""/>
                    </div>
                    <div className="formboard-status-box" style={{backgroundColor: "#FAE8E8"}}>
                        <FormListComponent forms={notStartedForms}/>
                    </div>
                </div>

                {/* Done */}
                <div className="formboard-status-container" style={{marginLeft: "1%", marginRight: "2%"}}>
                    <div className="formboard-status-title-wrapper">
                        <img className="formboard-status-title" src={icFormboardDone} alt=""/>
                    </div>
                    <div className="formboard-status-box" style={{backgroundColor: "#E5F8E9"}}>
                        <FormListComponent forms={doneForms}/>
                    </div>
                </div>

            </div>

        </div>
    );
}

FormBoardForLeader.propTypes = {
    forms: PropTypes.array
}

export default FormBoardForLeader;
