/**
 * 스페이스 (리더/관리자용) 화면
 */

import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useNavigate, useParams} from "react-router-dom";

import sformService from "../../apis/services/sformService";
import {spaceState, userState} from '../../commons/Atom';
import PropTypes from "prop-types";

import "../../styles/space.css";

import icLogoSample from "../../assets/ic_logo_sample.png";

import {motion} from "framer-motion"

import {
    SpaceOnly,
    FormListResponse
} from "../../commons/interfaces/commonInterface";
import FormBoardForMember from "../../components/space/FormBoardForMember";

const SpaceInformationComponent = ({spaceOnly, forms}: any) => {
    const navigate = useNavigate();

    if (!spaceOnly || !forms) {
        navigate("/main")
        return <></>;
    }

    return (
        <div id="space-container" className="space-container">
            {/* 스페이스에 대한 정보 */}
            <motion.div className="space-rectangle-white" style={{y: 100}} animate={{y: 0}}>
                <div className="space-img-wrapper">
                    <img className="space-img" src={icLogoSample} alt=""/>
                </div>
                <div className="space-title">{spaceOnly.name}</div>
                <div className="space-membercount">{spaceOnly.memberCount} / 50</div>
            </motion.div>

            <motion.div className="space-content-container" style={{y: 100}} animate={{y: 0}}>

                {/* 스페이스의 설문 목록 (Component 호출) */}
                <FormBoardForMember forms={forms}/>

            </motion.div>

        </div>
    );

}

const SpaceForMember = () => {
    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const {spaceId} = useParams();

    const [spaceOnly, setSpaceOnly] = useState<SpaceOnly | null>(null);
    const [forms, setForms] = useState<FormListResponse | null>(null);

    useEffect(() => {

        sformService
            .GetSpace(user.id, spaceId !== undefined ? spaceId : (space.id).toString())
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
    }, [spaceId]);

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
