import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";

import {selectedFormIdState} from "../../commons/Atom";
import sformService from "../../apis/services/sformService";
import {SubmissionListResponse, TargetGroupListResponse} from "../../commons/interfaces/commonInterface";

import icCheckCircleGreen from "../../assets/ic_check_circle_green.png";
import icCheckNotCircleRed from "../../assets/ic_check_not_circle_red.png";
import icProfile from "../../assets/ic_profile.png";

/**
 * 필수 설문에 대한 참여 현황 목록 불러오기
 */
const MandatoryFormSubmissionList = ({submissions}: any) => {
    const [submissionsByMandatoryForm, setSubmissionsByMandatoryForm] = useState(Array);

    useEffect(() => {

        const submissionList = Array.isArray(submissions) ? submissions.map(
            (s: any, i: number) => {

                return (
                    <>
                        <div key={s.memberId} className="submission-members-container"
                             style={{borderBottomWidth: i === submissions.length - 1 ? "0rem" : "0.05rem"}}>

                            <div className="submission-members-profile-wrapper">
                                <img className="submission-members-profile-img" src={icProfile} alt=""/>
                            </div>

                            <div className="submission-members-id">#{s.memberId}</div>

                            <div className="submission-members-name">{s.name}</div>

                            <div className="submission-members-email">{s.email}</div>

                            <div className="submission-members-status-wrapper">
                                {s.submit === false
                                    ? <img className="submission-members-status-img" src={icCheckNotCircleRed} alt=""/>
                                    : <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>}
                            </div>

                        </div>

                    </>
                );
            }) : [];

        setSubmissionsByMandatoryForm(submissionList);

    }, [submissions]);

    return <>{submissionsByMandatoryForm}</>;
}

/**
 * 선택 참여 설문에서 각각의 타겟 그룹을 선택했을 때 참여 현황 목록 불러오기
 */
const SubmissionListByTargetGroup = ({groupId, submissions}: any) => {
    const [submissionsByTargetGroup, setSubmissionsByTargetGroup] = useState(Array);

    useEffect(() => {

        // 1. 그룹 식별 번호를 통해 해당 그룹의 멤버들만 필터링한다.
        const membersByTargetGroup = Array.isArray(submissions) ? submissions.filter(
            (s: any) => s.groupId === groupId
        ) : [];

        // 2. 해당 멤버들의 참여 현황 목록을 보여준다.
        const updatedSubmissions = membersByTargetGroup.map(
            (s: any, i: number) => {

                return (
                    <>
                        <div key={s.memberId} className="submission-members-container"
                             style={{borderBottomWidth: i === submissions.length - 1 ? "0rem" : "0.05rem"}}>

                            <div className="submission-members-profile-wrapper">
                                <img className="submission-members-profile-img" src={icProfile} alt=""/>
                            </div>

                            <div className="submission-members-id">#{s.memberId}</div>

                            <div className="submission-members-name">{s.name}</div>

                            <div className="submission-members-email">{s.email}</div>

                            <div className="submission-members-status-wrapper">
                                {s.submit === false
                                    ? <img className="submission-members-status-img" src={icCheckNotCircleRed} alt=""/>
                                    : <img className="submission-members-status-img" src={icCheckCircleGreen} alt=""/>}
                            </div>

                        </div>

                    </>
                );
            });

        setSubmissionsByTargetGroup(updatedSubmissions);

    }, [groupId, submissions]);

    return <>{submissionsByTargetGroup}</>;
}

/**
 * 선택 참여 설문에 대한 참여 현황 목록 불러오기
 */
const NotMandatoryFormSubmissionList = ({targetGroups, submissions, getSelectedGroupId}: any) => {
    const [targetGroupsByNotMandatoryForm, setTargetGroupsByNotMandatoryForm] = useState(Array);

    const setSelectedGroupId = (groupId: number) => {
        getSelectedGroupId(groupId);
    }

    // 선택한 그룹을 초기화한다. 만약 이 부분이 없으면 다른 곳으로 이동했다가 왔을 때 이전에 열었던 그룹 멤버 목록이 그대로 보인다.
    useEffect(() => {
        setSelectedGroupId(0);
    }, [])

    useEffect(() => {

        let groups = document.getElementsByClassName("submission-groups-box");

        const updatedTargetGroups = Array.isArray(targetGroups) ? targetGroups.map(
            (t: any) => {

                /**
                 * 그룹 목록을 클릭했을 때
                 */
                const onClickGroup = (e: any) => {
                    e.preventDefault();

                    if (e.target.classList[1] === "submission-groups-box-clicked") {

                        e.target.classList.remove("submission-groups-box-clicked");
                        e.target.classList.add("submission-groups-box");
                        setSelectedGroupId(0);

                    } else {

                        for (let i = 0; i < groups.length; i++) {
                            groups[i].classList.remove("submission-groups-box-clicked");
                            groups[i].classList.add("submission-groups-box");
                        }

                        e.target.classList.remove("submission-groups-box-clicked");
                        e.target.classList.add("submission-groups-box-clicked");
                        setSelectedGroupId(t.groupId);
                    }
                }

                // 1. 설문에 참여해야 하는 타겟 그룹의 목록을 보여준다.
                // 2. 특정 타겟 그룹을 클릭했을 때 해당 그룹의 멤버들의 참여 현황을 보여준다.
                return (
                    <div key={t.groupId} id="submission-groups-box" className="submission-groups-box"
                         onClick={onClickGroup}>
                        {t.groupName}
                    </div>
                );

            }) : [];

        setTargetGroupsByNotMandatoryForm(updatedTargetGroups);

    }, [targetGroups, submissions]);

    return <>{targetGroupsByNotMandatoryForm}</>;
}

const SubmissionStatus = () => {
    const selectedFormId = useRecoilValue(selectedFormIdState);

    const [formTitle, setFormTitle] = useState("");
    const [isMandatory, setIsMandatory] = useState(0);
    const [submissions, setSubmissions] = useState<SubmissionListResponse[] | null>([]);
    const [targetGroups, setTargetGroups] = useState<TargetGroupListResponse[] | null>([]);
    const [selectedGroupId, setSelectedGroupId] = useState(0);

    const isSubmissionListDisplay = selectedFormId === 0 ? "none" : "flex";

    const getSelectedGroupId = (groupId: number) => {
        setSelectedGroupId(groupId);
    }

    useEffect(() => {

        /**
         * 특정 설문의 필수 여부 정보 가져오기
         */
        sformService
            .GetMandatoryOrNotByForm(selectedFormId)
            .then((response) => {

                const result = response.result;

                if (result.formId === selectedFormId) {
                    setFormTitle(result.title);
                    setIsMandatory(result.isMandatory === "N" ? 0 : 1);
                }

            });

        /**
         * 특정 설문의 참여 현황 목록 불러오기
         */
        sformService
            .GetSubmissionListByForm(selectedFormId)
            .then((response) => {

                const result = response.result;
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
            sformService
                .GetTargetGroupsByForm(selectedFormId)
                .then((response) => {

                    const result = response.result;
                    // console.log(`Target group list: ${JSON.stringify(result)}`);
                    setTargetGroups(result);

                })
                .catch((error) => {
                    // console.log(error);
                });
        }

    }, [isMandatory])

    return (
        <div className="submission-rectangle-white" style={{display: isSubmissionListDisplay}}>

            <div className="submission-title"><span style={{color: "#6ABBFA"}}>{formTitle}</span> 참여 현황 목록
                {isMandatory === 0
                    ? <span style={{color: "gray", fontSize: "0.8rem"}}>&nbsp;&nbsp; (선택 참여)</span>
                    : <span style={{color: "gray", fontSize: "0.8rem"}}>&nbsp;&nbsp; (필수 참여)</span>}
            </div>

            {/* 만약 선택 참여 설문인 경우 그룹과 함께 보여준다. */}
            {isMandatory === 0 &&
                <div className="submission-groups-and-members-container">

                    <div className="submission-groups-container">
                        <NotMandatoryFormSubmissionList targetGroups={targetGroups} submissions={submissions}
                                                        getSelectedGroupId={getSelectedGroupId}/>
                    </div>

                    <div className="submission-members-container-by-group">
                        <SubmissionListByTargetGroup groupId={selectedGroupId} submissions={submissions}/>
                    </div>

                </div>
            }

            {/* 만약 필수 설문인 경우 멤버들의 목록만 보여준다. */}
            {isMandatory === 1 &&
                <MandatoryFormSubmissionList submissions={submissions}/>
            }

        </div>
    );
}

export default SubmissionStatus;
