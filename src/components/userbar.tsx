import "../styles/userbar.css";

import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

import {userState, spaceState} from "../commons/Atom";
import {useRecoilState, useRecoilValue} from "recoil";

import spaces from "../services/space/space";

import profile from "../assets/ic_profile.png";
import logo from "../assets/ic_logo_hivey.png";
import label from "../assets/ic_label_white.png";
import location from "../assets/ic_logo_sample.png";
import logout from "../assets/ic_logout_gray.png";

const SpaceListComponent = ({spaces, isManager}: any) => {
    const [space, setSpace] = useRecoilState(spaceState);
    const [spaceList, setSpaceList] = useState(Array);
    const navigate = useNavigate();

    useEffect(() => {
        if (spaces) {
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
                            id: s.id, img: "", name: s.name
                        });

                        if (s.isManager) {
                            navigate("/man");

                        } else {
                            navigate("/part");
                        }

                    };
                    return (
                        <div className={style} onClick={onClickSpace}>
                            <img className="location" src={location} alt="location"/>{space.name}
                        </div>
                    );
                });

            setSpaceList(newList);
        }
    }, [spaceList, isManager]);

    if (!spaceList) {
        return null;
    }

    return <>{spaceList}</>;
};

const Userbar = () => {
    const [message, setMessage] = useState("");
    const [spaceList, setSpaceList] = useState([]);
    const user = useRecoilValue(userState);

    useEffect(() => {
        spaces
            .GetSpaceList(user.id)
            .then((response) => {
                const {code, message} = response;

                setSpaceList(response.result);

                setMessage(message);
                console.log(`message: ${message}`);

                if (code === 1000) {
                    // handle login success
                    setMessage(message);
                    console.log("스페이스 목록을 불러오는 데 성공했습니다.");
                } else {
                    // handle login failure
                    setMessage(message);
                    console.log("스페이스 목록을 불러오는 데 실패하였습니다.");
                }

            })
            .catch((error) => {
                console.log(error);
                setMessage("서버와의 연결에 실패하였습니다.");
            });
    },); // spaceList 안의 값이 바뀔 때만 다시 불러오도록 한다.

    return (
        <div className="userbar-container">
            <img className="logo" src={logo} alt="logo"/>
            <div className="user-profile">
                <img className="profile" src={profile} alt="user profile"/>
                <span className="username">{user.name}</span>
            </div>
            <div className="user-spaces">
                <div className="label"><img src={label} alt="label"/>MANAGER</div>
                <div className="spaces-list">
                    <SpaceListComponent spaces={spaces} isManager={1}/>
                </div>
            </div>
            <div className="user-spaces">
                <span className="label"><img src={label} alt="label"/>MEMBER</span>
                <div>
                    <SpaceListComponent spaces={spaces} isManager={0}/>
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
