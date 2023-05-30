import "../styles/userbar.css";

import React, {useState, useEffect} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {userState, spaceState} from "../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";

import spaceService from "../services/space/space";
import setting from "../assets/ic_setting_gray.png";
import profile from "../assets/ic_profile.png";
import logo from "../assets/ic_logo_hivey.png";
import label from "../assets/ic_label_white.png";
import location from "../assets/ic_logo_sample.png";
import logout from "../assets/ic_logout_gray.png";
import icSettingGray from "../assets/ic_setting_gray.png";

const SpaceListComponent = ({spaces, isManager}: any) => {
    const [spaceList, setSpaceList] = useState(Array);
    const navigate = useNavigate();

    const [space, setSpace] = useRecoilState(spaceState);

    useEffect(() => {
        let spaceListElements = document.getElementsByClassName("space-item");

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

                            e.target.classList[0].add("space-item-clicked");
                            setSpace({id: s.spaceId, name: s.name});
                        }

                        if (s.isManager) {
                            // window.location.reload();
                            // window.location.replace("/space/leader");
                        } else {
                            // window.location.reload();
                            // window.location.replace("/space/member")l
                        }
                    };

                    return (

                        <div key={s.spaceId} className="space-item" onClick={onClickSpace}>
                            <img className="space-item-location" src={location} alt="location"/>
                            <div className="space-item-name">{s.name}</div>
                        </div>
                    );
                });

            setSpaceList(newList);

        }
    }, [spaces]);

    if (!spaceList) {
        return null;
    }

    return <>{spaceList}</>;
};

const Userbar = () => {
    const [spaceList, setSpaceList] = useState([]);
    const user = useRecoilValue(userState);

    useEffect(() => {

        spaceService
            .GetSpaceList(user.id)
            .then((response) => {

                setSpaceList(response.result);

            })
            .catch((error) => {
                console.log(error);
            });

    }, [user.id]);

    return (
        <div className="userbar-container">


            <img className="logo" src={logo} alt="logo"/>

            <div className="user-profile">
                <img className="user-profile-img" src={profile} alt="user profile"/>
                <div className="username">{user.name}</div>
                <img className="user-profile-setting" src={icSettingGray} alt="setting" />
            </div>

            <div className="user-spaces">
                <div className="label"><img src={label} alt="label"/>MANAGER</div>
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaceList} isManager={1}/>
                </div>
            </div>

            <div className="user-spaces">
                <span className="label"><img src={label} alt="label"/>MEMBER</span>
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaceList} isManager={0}/>
                </div>
                <img className="logout" src={logout} alt="logout"></img>
            </div>
        </div>
    );
};

Userbar.propTypes = {
    user: PropTypes.object,
    spaces: PropTypes.array,
};

export default Userbar;
