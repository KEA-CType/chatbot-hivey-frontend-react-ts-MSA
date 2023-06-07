import "../styles/userbar.css";

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {userState, spaceState} from "../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";

import spaceService from "../apis/services/sformService";
import setting from "../assets/ic_setting_gray.png";
import profile from "../assets/ic_profile.png";
import icLogoHiVey from "../assets/ic_logo_hivey.png";
import label from "../assets/ic_label_white.png";
import icLogoSample from "../assets/ic_logo_sample.png";

import icLogoutGray from "../assets/ic_logout_gray.png";
import icLogoutBlack from "../assets/ic_logout_black.png";
import icSettingGray from "../assets/ic_setting_gray.png";
import userService from "../apis/services/userService";

import {UserInfoResponse} from "../commons/interfaces/userResponse";
import Modal from "./commons/Modal";


const SpaceListComponent = ({spaces, isManager}: any) => {
    const [space, setSpace] = useRecoilState(spaceState);

    const [style, setStyle] = useState("");
    const [spaceList, setSpaceList] = useState(Array);

    const navigate = useNavigate();

    let spaceListElements = document.getElementsByClassName("space-item-container");

    useEffect(() => {

        if (spaceList) {

            const filteredList = Array.isArray(spaces) ? spaces.filter(
                (s: any) => s.isManager === isManager
            ) : [];

            const newList = filteredList.map(
                (s: any) => {

                    // s.spaceId === space.id ? setStyle("space-item-container-clicked") : setStyle("space-item-container");

                    // 목록에 있는 각 스페이스를 클릭했을 때 해당 스페이스로 이동하도록 한다.

                    const onClickSpace = (e: any) => {
                        e.preventDefault();

                        if (e.target.classList[0] === "space-item-container-clicked") {

                            e.target.classList.add("space-item-container-clicked")
                            setSpace({id: 0, name: ""});

                        } else {

                            for (let i = 0; i < spaceListElements.length; i++) {
                                spaceListElements[i].classList.remove("space-item-container-clicked");
                            }

                            e.target.classList.add("space-item-container-clicked");
                            setSpace({id: s.spaceId, name: s.name});
                        }

                        setSpace({
                            id: s.spaceId, name: s.name
                        });

                        s.spaceId === space.id ? setStyle("sform-item active") : setStyle("sform-item");
                        if (s.isManager) {

                            navigate(`/refresh?destination=/space/leader/${s.spaceId}`, {replace: true});
                        } else {
                            navigate(`/refresh?destination=/space/member/${s.spaceId}`, {replace: true});
                        }

                    };

                    return (

                        <div className="space-item-container" onClick={onClickSpace}>
                            <img className="space-item-img" src={
                                `${s.img}` === "" || s.img === null ? icLogoSample : `${process.env.PUBLIC_URL}${s.img}`}
                                 alt="profile"/>

                            <div key={s.id} className="space-item">
                                {s.name}
                            </div>
                        </div>

                    );
                });

            setSpaceList(newList);

        }
    }, [space, spaces]);

    if (!spaceList) {
        return null;
    }

    return <>{spaceList}</>;
};

const Userbar = () => {
    const navigate = useNavigate();

    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const [spaceList, setSpaceList] = useState([]);
    const [userInfo, setUserInfo] = useState<UserInfoResponse>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const handleClickLogo = () => {
        window.location.replace("/main");
    }

    const handleClickLogout = () => {

        setIsModalOpen(true);
        setModalHeader("로그아웃");
        setModalMessage("정말 로그아웃 하시겠습니까?");
    }

    const handleLogout = () => {
        localStorage.removeItem('jwt-token');
        navigate("/login");
    }

    useEffect(() => {

        userService
            .GetUserInformation(user.id)
            .then((response) => {

                const file = `${process.env.PUBLIC_URL}${response.img}`;

                setUserInfo({
                    userId: response.userId,
                    img: file,
                    email: response.email,
                    name: response.name
                });

            })
            .catch((error) => {
                console.log(error);
            });

        spaceService
            .GetSpaceList(user.id)
            .then((response) => {
                const {code} = response;

                setSpaceList(response.result);

                const destination = new URLSearchParams(window.location.search).get("destination");
                if (destination) {
                    navigate(destination, {replace: true});

                }

            })
            .catch((error) => {
                console.log(error);
            });


    }, [user, space]);

    return (
        <div className="userbar-container">
            <img className="logo" src={icLogoHiVey} alt="logo" onClick={handleClickLogo}/>

            <div className="user-profile">
                <img className="user-profile-img"
                     src={userInfo?.img === "/images/null" ? profile : userInfo?.img}
                     alt="user"/>
                <div className="user-information-container">
                    <div className="user-name">{userInfo?.name}</div>
                    <div className="user-email">{userInfo?.email}</div>
                </div>
                <img className="user-profile-setting" src={icSettingGray} alt="setting"/>
            </div>

            <div className="label"><img src={label} alt="label"/>MANAGER</div>

            <div className="user-spaces">
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaceList} isManager={1}/>
                </div>
            </div>

            <span className="label"><img src={label} alt="label"/>MEMBER</span>
            <div className="user-spaces">
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaceList} isManager={0}/>
                </div>
            </div>

            <div className="logout-container" onClick={handleClickLogout}>
                <img className="logout" src={icLogoutGray} alt="logout"/>
                <img className="logout-active" src={icLogoutBlack} alt="logout"/>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                header={modalHeader}>

                <p>{modalMessage}</p>

                <button className="logout-btn" onClick={handleLogout}>Enter</button>

            </Modal>
        </div>
    );
};

Userbar.propTypes = {
    user: PropTypes.object,
    spaces: PropTypes.array,
};

export default Userbar;

