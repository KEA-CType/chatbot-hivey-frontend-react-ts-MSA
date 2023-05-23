import {Suspense} from 'react';
import {useRecoilValue} from 'recoil';

import {fetchSpace} from "../../services/space/space";
import {spaceState, userState} from '../../commons/Atom';

const MainSpaceForLeader = () => {

    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    function SpaceInformation({resource}: any) {
        const currentSpace = resource.space.read();

        return (
            <h1>Manager {currentSpace.name}</h1>
        );
    }

    return (
        <div className="participant-page">
            <div className='survey-container'>
                <div className='space-name'>
                    <Suspense fallback={<div>...loading</div>}>
                        <SpaceInformation resource={fetchSpace(user.id, space.id)}/>
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default MainSpaceForLeader;
