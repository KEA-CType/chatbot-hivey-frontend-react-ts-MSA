/**
 * 스페이스 (리더/관리자용) 화면
 */

import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';

import spaceService from "../../services/space/space";
import {spaceState, userState} from '../../commons/Atom';
import PropTypes from "prop-types";

import {
    SpaceOnly,
    FormListResponse,
    GroupListResponse
} from "../../commons/Interface";

const SpaceInformationComponent = ({spaceOnly, forms, groups}: any) => {

    useEffect(() => {

        if (spaceOnly || forms || groups) {

            console.log(`currentSpace: ${JSON.stringify(spaceOnly)}`);
            console.log(`forms: ${JSON.stringify(forms)}`);
            console.log(`groups: ${JSON.stringify(groups)}`);

        }

    }, [spaceOnly, forms, groups])

    if (!spaceOnly || !forms || !groups) {
        return <div>loading...</div>;
    }

    return <>{}</>;
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

                return (
                    <div>
                        {/* 스페이스에 대한 정보 */}
                        <div></div>
                        {/* 스페이스의 설문 목록 (Component 호출) */}
                        {/* 스페이스의 설문 참여 목록 (Component 호출) */}
                        {/* 스페이스의 그룹 목록 (Component 호출) */}
                        <div></div>
                    </div>
                )

            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className="participant-page">
            <div className='survey-container'>
                <div className='space-name'>
                    <SpaceInformationComponent spaceOnly={spaceOnly} forms={forms} groups={groups} />
                </div>
            </div>
        </div>
    );
};

SpaceForLeader.propTypes = {
    spaceOnly: PropTypes.object,
    forms: PropTypes.array,
    groups: PropTypes.array,
};

export default SpaceForLeader;
