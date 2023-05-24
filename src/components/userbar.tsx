import "../styles/userbar.css";

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
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

const SpaceListComponent = ({spaces, isManager}: any) => {
    const [spaceList, setSpaceList] = useState(Array);
    const navigate = useNavigate();

    const [space, setSpace] = useRecoilState(spaceState);

    useEffect(() => {

        if (spaceList) {

            const filteredList = Array.isArray(spaces) ? spaces.filter(
                (s: any) => s.isManager === isManager
            ) : [];

            const newList = filteredList.map(
                (s: any) => {
                    const style =
                        s.spaceId === space.id ? "space-item active" : "space-item";

                    // 목록에 있는 각 스페이스를 클릭했을 때 해당 스페이스로 이동하도록 한다.
                    const onClickSpace = () => {

                        setSpace({
                            id: s.spaceId, name: s.name
                        });

                        if (s.isManager) {
                            navigate("/space/leader");

                        } else {
                            navigate("/space/member");
                        }

                    };

                    return (
                        <div key={s.spaceId} className={style} onClick={onClickSpace}>
                            <img className="location" src={location} alt="location"/>{s.name}
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
                const {code} = response;

                setSpaceList(response.result);

                if (code === 1000) {
                    console.log("스페이스 목록을 불러오는 데 성공했습니다.");
                } else {
                    console.log("스페이스 목록을 불러오는 데 실패하였습니다.");
                }

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className="userbar-container">
            <img className="userbar-logo" src={logo} alt="logo"/>
            <div className="user-profile">
                <div className="user-info"><img className="profile" src={profile} alt="user profile"/>
                <span className="username">{user.name}</span></div>
                
                <div className="set"><img className="setting" src={setting} alt="setting"></img></div>
                
            </div>
            <div className="user-spaces">
                <div className="label"><img src={label} alt="label"/>MANAGER</div>
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaceList} isManager={1}/>
                </div>
            </div>
            <div className="user-spaces">
                <span className="label"><img src={label} alt="label"/>MEMBER</span>
                <div>
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
