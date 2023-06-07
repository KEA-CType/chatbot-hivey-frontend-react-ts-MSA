/**
 * 스페이스의 모든 설문 목록을 보여주는 부분
 */

import React, {useEffect, useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import * as moment from 'moment';

import icFormboardDone from "../../assets/ic_formboard_done.png";
import icFormboardInprogress from "../../assets/ic_formboard_inprogress.png";
import icFormboardNotstarted from "../../assets/ic_formboard_notstarted.png";
import icCheckCircleGreen from "../../assets/ic_check_circle_green.png";
import icUsersGray from "../../assets/ic_users_gray.png";
import icChartPieSliceGray from "../../assets/ic_chart_pie_slice_gray.png";


import {formIdState, selectedFormIdState, spaceState} from "../../commons/Atom";

const FormListComponent = ({forms}: any) => {
    const space = useRecoilValue(spaceState);

    const [formsByStatus, setFormsByStatus] = useState(Array);
    const setFormId = useSetRecoilState(formIdState);
    const setSelectedFormId = useSetRecoilState(selectedFormIdState);

    const navigate = useNavigate();

    useEffect(() => {

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
                 * 참여 현황 보기 아이콘을 클릭했을 때 클릭한 설문 식별 번호를 저장한다.
                 */
                const handleSubmissionList = (e: any) => {
                    e.stopPropagation();

                    setSelectedFormId(f.formId);
                }

                /**
                 * 설문 결과 보기 아이콘을 클릭했을 때 설문 결과 페이지로 이동한다.
                 */
                const handleFormResult = (e: any) => {
                    e.stopPropagation();
                    console.log(`spaceId: ${space.id}, formId: ${f.formId}`);
                    navigate(`/space/${space.id}/form/${f.formId}/result`);
                }

                return (
                    <div key={f.formId} className="formboard-form" onClick={onClickForm}>

                        {/* FIXME: 나중에 (참여 여부, 타겟 여부에 따라서) 분기 처리 추가하기 */}
                        <div className="formboard-form-icon-wrapper">
                            <img className="formboard-form-icon-img" src={icCheckCircleGreen} alt=""/>
                        </div>

                        <div className="formboard-form-information" style={{marginLeft: "0.1rem"}}>
                            <div className="formboard-form-information-title">{f.title}</div>
                            <div
                                className="formboard-form-information-date">~{(moment(f.endDate)).format('YYYY.MM.DD')}</div>
                        </div>

                        <div className="formboard-form-icon-wrapper" onClick={handleSubmissionList} style={{marginLeft: "1rem"}}>
                            <img className="formboard-form-right-icon-img" src={icUsersGray} alt=""/>
                        </div>

                        <div className="formboard-form-icon-wrapper" onClick={handleFormResult} style={{marginLeft: "0rem"}}>
                            <img className="formboard-form-right-icon-img" src={icChartPieSliceGray} alt=""/>
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
        // console.log(`inProgress: ${JSON.stringify(filteredForms)}`);

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
