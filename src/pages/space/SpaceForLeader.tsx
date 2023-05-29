/**
 * 스페이스 (리더/관리자용) 화면
 */

import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useNavigate} from "react-router-dom";

import spaceService from "../../services/space/space";
import {selectedFormIdState, spaceState, userState} from '../../commons/Atom';
import PropTypes from "prop-types";

import FormBoardForLeader from "../../components/space/FormBoardForLeader";
import SubmissionStatus from "../../components/space/SubmissionStatus";
import GroupMemberList from "../../components/space/GroupMemberList";

import "../../styles/space.css";

import icLogoSample from "../../assets/ic_logo_sample.png";
import icEditGray from "../../assets/ic_edit_gray.png";

import {
    SpaceOnly,
    FormListResponse,
    GroupListResponse
} from "../../commons/Interface";

const SpaceInformationComponent = ({spaceOnly, forms, groups}: any) => {
    const selectedFormId = useRecoilValue(selectedFormIdState);

    const navigate = useNavigate();

    // useEffect(() => {
    //
    //     const renderInformation = () => {
    //
    //         if (spaceOnly && forms && groups) {
    //
    //             console.log(`currentSpace: ${JSON.stringify(spaceOnly)}`);
    //             console.log(`forms: ${JSON.stringify(forms)}`);
    //             console.log(`groups: ${JSON.stringify(groups)}`);
    //
    //         }
    //     }
    //
    //     renderInformation();
    //
    // }, [spaceOnly, forms, groups]);

    if (!spaceOnly || !forms || !groups) {
        navigate("/main")
        return <></>;
    }

    return (
        <div className="space-container">
            {/* 스페이스에 대한 정보 */}
            <div className="space-rectangle-white">
                <div className="space-img-wrapper">
                    <img className="space-img" src={icLogoSample} alt=""/>
                </div>
                <div className="space-title">{spaceOnly.name}</div>
                <div className="space-membercount">{spaceOnly.memberCount} / 50</div>
                <div className="space-edit-wrapper">
                    <img className="space-edit-img" src={icEditGray} alt=""/>
                </div>
            </div>

            {/* 스페이스의 설문 목록 (Component 호출) */}
            <FormBoardForLeader forms={forms}/>

            {/* 스페이스의 설문 참여 목록 (Component 호출) */}
            { selectedFormId !== 0 && <SubmissionStatus /> }

            {/* 스페이스의 그룹 목록 (Component 호출) */}
            <GroupMemberList groups={groups} />
        </div>
    );

}

const SpaceForLeader = () => {
    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const [spaceOnly, setSpaceOnly] = useState<SpaceOnly | null>(null);
    const [forms, setForms] = useState<FormListResponse | null>(null);
    const [groups, setGroups] = useState<GroupListResponse | null>(null);

    useEffect(() => {
        spaceService
            .GetSpace(user.id, space.id)
            .then((response) => {

                const result = JSON.parse(response).result;

                setSpaceOnly({
                    name: result.name, img: result.img, memberCount: result.memberCount
                });
                setForms(result.forms);
                setGroups(result.groups);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <SpaceInformationComponent spaceOnly={spaceOnly} forms={forms} groups={groups}/>
        </div>
    );
};

SpaceForLeader.propTypes = {
    spaceOnly: PropTypes.object,
    forms: PropTypes.array,
    groups: PropTypes.array,
};

export default SpaceForLeader;
