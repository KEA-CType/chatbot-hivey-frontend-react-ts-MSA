import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";

import {selectedFormIdState} from "../../commons/Atom";
import formService from "../../services/form/form";
import {SubmissionListResponse, TargetGroupListResponse} from "../../commons/Interface";

import icCheckCircleGreen from "../../assets/ic_check_circle_green.png";
import icCheckNotCircleRed from "../../assets/ic_check_not_circle_red.png";
import icProfile from "../../assets/ic_profile.png";

/**
 * 필수 설문에 대한 참여 현황 목록 불러오기
 */
const MandatoryFormSubmissionList = ({submissions}: any) => {
    const [submissionsByMandatoryForm, setSubmissionsByMandatoryForm] = useState(Array);

    useEffect(() => {

        const submissionList = submissions.map(
            (s: any, i: number) => {

                return (
                    <div key={s.memberId}>

                        <div className="submission-members-container">

                            <div className="submission-members-profile-wrapper">
                                <img className="submission-members-profile-img" src={icProfile} alt=""/>
                            </div>

                            <div className="submission-members-id">{s.memberId}</div>

                            <div className="submission-members-name">{s.name}</div>

                            <div className="submission-members-email">{s.email}</div>

                            <div className="submission-members-status-wrapper">
                                {s.submit === false
                                    ? <img className="submission-members-status-img" src={icCheckNotCircleRed} alt=""/>
                                    : <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>}
                            </div>

                        </div>

                        {i < (submissions.length - 1) && <div className="submission-members-line"></div>}

                    </div>
                );
            });

        setSubmissionsByMandatoryForm(submissionList);

    }, [submissions]);

    return <>{submissionsByMandatoryForm}</>;
}

/**
 * 선택 설문에 대한 참여 현황 목록 불러오기
 */
const NotMandatoryFormSubmissionList = ({targetGroups, submissions}: any) => {
    const [submissionsByNotMandatoryForm, setSubmissionsByNotMandatoryForm] = useState(Array);

    useEffect(() => {

        const submissionList = submissions.map(
            (s: any, i: number) => {

                return (
                    <div key={s.memberId}>

                        <div className="submission-members-container">

                            <div className="submission-members-profile-wrapper">
                                <img className="submission-members-profile-img" src={icProfile} alt=""/>
                            </div>

                            <div className="submission-members-id">{s.memberId}</div>

                            <div className="submission-members-name">{s.name}</div>

                            <div className="submission-members-email">{s.email}</div>

                            <div className="submission-members-status-wrapper">
                                {s.submit === false
                                    ? <img className="submission-members-status-img" src={icCheckNotCircleRed} alt=""/>
                                    : <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>}
                            </div>

                        </div>

                        {i < (submissions.length - 1) && <div className="submission-members-line"></div>}

                    </div>
                );
            });

        setSubmissionsByNotMandatoryForm(submissionList);

    }, [targetGroups, submissions]);

    return <>{submissionsByNotMandatoryForm}</>;
}

const SubmissionStatus = () => {
    const selectedFormId = useRecoilValue(selectedFormIdState);

    const [formTitle, setFormTitle] = useState("");
    const [isMandatory, setIsMandatory] = useState(0);
    const [submissions, setSubmissions] = useState<SubmissionListResponse[] | null>([]);
    const [targetGroups, setTargetGroups] = useState<TargetGroupListResponse[] | null>([]);

    const isSubmissionListDisplay = selectedFormId === 0 ? "none" : "flex";

    useEffect(() => {

        /**
         * 특정 설문의 필수 여부 정보 가져오기
         */
        formService
            .GetMandatoryOrNotByForm(selectedFormId)
            .then((response) => {

                const result = response.result;
                console.log(`Mandotory or not: ${JSON.stringify(result)}`);

                if (result.formId === selectedFormId) {
                    setFormTitle(result.title);
                    setIsMandatory(result.isMandatory === "N" ? 0 : 1);
                    console.log(`isMandatory: ${isMandatory}`);
                } else {
                    console.log("잘못된 정보입니다.");
                }

            });

        /**
         * 특정 설문의 참여 현황 목록 불러오기
         */
        formService
            .GetSubmissionListByForm(selectedFormId)
            .then((response) => {

                const result = response.result;
                console.log(`Submission list: ${JSON.stringify(result)}`);
                setSubmissions(result);

            })
            .catch((error) => {
                console.log(error);
            });

    }, [selectedFormId]);

    useEffect(() => {

        if (isMandatory === 0) {
            /**
             * 특정 설문의 타겟 그룹 목록 불러오기
             */
            formService
                .GetTargetGroupsByForm(selectedFormId)
                .then((response) => {

                    const result = response.result;
                    console.log(`Target group list: ${JSON.stringify(result)}`);
                    setTargetGroups(result);

                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [isMandatory])

    return (
        <div className="submission-rectangle-white" style={{display: isSubmissionListDisplay}}>

            {/* FIXME: formTitle 가져오는 부분 수정할 수 있으면 수정하기 */}
            <div className="submission-title">설문 참여 현황 목록
                {isMandatory === 0
                    ? <span style={{color: "gray", fontSize: "0.8rem"}}>&nbsp;&nbsp; (선택 참여)</span>
                    : <span style={{color: "gray", fontSize: "0.8rem"}}>&nbsp;&nbsp; (필수 참여)</span>}
            </div>

            {/* 만약 필수 설문인 경우 멤버들을 목록만 보여주고, 선택 설문인 경우 그룹과 함께 보여준다. */}
            {isMandatory === 0
                ? <NotMandatoryFormSubmissionList targetGroups={targetGroups} submissions={submissions}/>
                : <MandatoryFormSubmissionList submissions={submissions}/>}

            {/*<div className="submission-members-container">*/}

            {/*    <div className="submission-members-profile-wrapper">*/}
            {/*        <img className="submission-members-profile-img" src={icProfile} alt=""/>*/}
            {/*    </div>*/}

            {/*    <div className="submission-members-id">#1</div>*/}

            {/*    <div className="submission-members-name">레몬이</div>*/}

            {/*    <div className="submission-members-email">ska2870ghk@gachon.ac.kr</div>*/}

            {/*    <div className="submission-members-status-wrapper">*/}
            {/*        <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>*/}
            {/*    </div>*/}

            {/*</div>*/}

            {/*<div className="submission-members-line"></div>*/}

            {/*<div className="submission-members-container">*/}

            {/*    <div className="submission-members-profile-wrapper">*/}
            {/*        <img className="submission-members-profile-img" src={icProfile} alt=""/>*/}
            {/*    </div>*/}

            {/*    <div className="submission-members-id">#2</div>*/}

            {/*    <div className="submission-members-name">남선우</div>*/}

            {/*    <div className="submission-members-email">rudghk3352@naver.com</div>*/}

            {/*    <div className="submission-members-status-wrapper">*/}
            {/*        <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>*/}
            {/*    </div>*/}

            {/*</div>*/}

        </div>
    );
}

export default SubmissionStatus;
