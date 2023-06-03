import "../styles/userbar.css";

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import {userState, spaceState} from "../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";

import spaceService from "../services/space/space";

import profile from "../assets/ic_profile.png";
import icLogoHiVey from "../assets/ic_logo_hivey.png";
import label from "../assets/ic_label_white.png";
import icLogoutGray from "../assets/ic_logout_gray.png";
import icLogoutBlack from "../assets/ic_logout_black.png";
import icSettingGray from "../assets/ic_setting_gray.png";

const SpaceListComponent = ({spaces, isManager}: any) => {
    const [space, setSpace] = useRecoilState(spaceState);

    const [spaceList, setSpaceList] = useState(Array);

    const navigate = useNavigate();

    let spaceListElements = document.getElementsByClassName("space-item");

    useEffect(() => {

        if (spaceList) {

            const filteredList = Array.isArray(spaces) ? spaces.filter(
                (s: any) => s.isManager === isManager
            ) : [];

            const newList = filteredList.map(
                (s: any) => {

                    // 목록에 있는 각 스페이스를 클릭했을 때 해당 스페이스로 이동하도록 한다.
                    const onClickSpace = (e: any) => {
                        e.preventDefault();

                        if (e.target.classList[0] === "space-item-clicked") {

                            e.target.classList.add("space-item-clicked")
                            setSpace({id: 0, name: ""});

                        } else {

                            for (let i = 0; i < spaceListElements.length; i++) {
                                spaceListElements[i].classList.remove("space-item-clicked");
                            }

                            e.target.classList.add("space-item-clicked");
                            setSpace({id: s.spaceId, name: s.name});
                        }

                        if (s.isManager) {
                            navigate(`/refresh?destination=/space/leader/${s.spaceId}`, {replace: true});
                        } else {
                            navigate(`/refresh?destination=/space/member/${s.spaceId}`, {replace: true});
                        }
                    };

                    return (

                        <div key={s.spaceId} className="space-item" onClick={onClickSpace}>
                            {s.name}
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
    const [spaceList, setSpaceList] = useState([]);
    const user = useRecoilValue(userState);
    const space = useRecoilValue(spaceState);

    const navigate = useNavigate();

    const handleClickLogo = () => {
        window.location.replace("/main");
    }

    useEffect(() => {

        spaceService
            .GetSpaceList(user.id)
            .then((response) => {

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
                <img className="user-profile-img" src={profile} alt="user profile"/>
                <div className="user-information-container">
                    <div className="user-name">{user.name}</div>
                    <div className="user-email">{user.email}</div>
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

            <div className="logout-container">
                <img className="logout" src={icLogoutGray} alt="logout"/>
                <img className="logout-active" src={icLogoutBlack} alt="logout"/>
            </div>
        </div>
    );
};

Userbar.propTypes = {
    user: PropTypes.object,
    spaces: PropTypes.array,
};

export default Userbar;
