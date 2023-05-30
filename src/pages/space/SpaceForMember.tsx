/**
 * 스페이스 (멤버/구성원용) 화면
 */

import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useNavigate} from "react-router-dom";

import spaceService from "../../services/space/space";
import {spaceState, userState} from '../../commons/Atom';
import PropTypes from "prop-types";

import FormBoardForMember from "../../components/space/FormBoardForMember";

import "../../styles/space.css";

import icLogoSample from "../../assets/ic_logo_sample.png";

import {
    SpaceOnly,
    FormListResponse
} from "../../commons/Interface";

const SpaceInformationComponent = ({spaceOnly, forms}: any) => {
    const navigate = useNavigate();

    if (!spaceOnly || !forms) {
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
            </div>

            {/* 스페이스의 설문 목록 (Component 호출) */}
            <FormBoardForMember forms={forms}/>
        </div>
    );

}

const SpaceForMember = () => {
    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const [spaceOnly, setSpaceOnly] = useState<SpaceOnly | null>(null);
    const [forms, setForms] = useState<FormListResponse | null>(null);

    useEffect(() => {
        spaceService
            .GetSpace(user.id, space.id)
            .then((response) => {

                const result = JSON.parse(response).result;

                setSpaceOnly({
                    name: result.name, img: result.img, memberCount: result.memberCount
                });
                setForms(result.forms);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <SpaceInformationComponent spaceOnly={spaceOnly} forms={forms}/>
        </div>
    );
};

SpaceForMember.propTypes = {
    spaceOnly: PropTypes.object,
    forms: PropTypes.array
};

export default SpaceForMember;
