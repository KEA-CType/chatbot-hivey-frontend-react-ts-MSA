/**
 * 스페이스 (리더/관리자용) 화면
 */

import {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import spaceService from "../../services/space/space";
import {spaceState, userState} from '../../commons/Atom';
import {SpaceInformationResponse} from "../../commons/Interface";
import PropTypes from "prop-types";

const SpaceInformationComponent = ({currentSpace}: any) => {
    const [space, setSpace] = useState({});

    useEffect(() => {

        if (currentSpace) {

            console.log(`currentSpace: ${currentSpace}`);

        }

    }, [currentSpace])

    if (!currentSpace) {
        return <div>loading...</div>;
    }

    return <>{currentSpace}</>;
}

const SpaceForLeader = () => {
    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const [currentSpace, setCurrentSpace] = useState();

    useEffect(() => {
        spaceService
            .GetSpace(user.id, space.id)
            .then((response) => {

                console.log(`user.id: ${user.id}, space.id: ${space.id}`);
                console.log(`response.result: ${JSON.stringify(response)}`);

            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div className="participant-page">
            <div className='survey-container'>
                <div className='space-name'>
                    <SpaceInformationComponent currentSpace={currentSpace} />
                </div>
            </div>
        </div>
    );
};

SpaceForLeader.propTypes = {
    currentSpace: PropTypes.object
};

export default SpaceForLeader;
