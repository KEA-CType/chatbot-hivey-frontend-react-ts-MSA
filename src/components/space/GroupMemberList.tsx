import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import icProfile from "../../assets/ic_profile.png";
import icKebabBlack from "../../assets/ic_kebab_black.png";

const MemberListByGroup = ({groupId, groups}: any) => {
    const [membersByGroup, setMembersByGroup] = useState(Array);

    useEffect(() => {

        let members = [];

        for (let i = 0; i < groups.length; i++) {
            if (groups[i].groupId === groupId) {
                members = groups[i].members;
            }
        }

        const updatedMembers = members.map(
            (m: any, i: number) => {

                return (
                    <div key={m.memberId} className="group-member-container-by-group"
                         style={{borderBottomWidth: i === members.length - 1 || members.length === 0 ? "0" : "0.05rem"}}>

                        <div className="group-member-profile-wrapper">
                            <img className="group-member-profile-img" src={icProfile} alt=""/>
                        </div>

                        <div className="group-member-id">#{m.memberId}</div>

                        <div className="group-member-name">{m.name}</div>

                        <div className="group-member-email">{m.email}</div>

                        {/*<div className="group-member-kebab-wrapper">*/}
                        {/*    <img className="group-member-kebab-img" src={icKebabBlack} alt=""/>*/}
                        {/*</div>*/}

                    </div>
                );
            });

        setMembersByGroup(updatedMembers);

    }, [groupId, groups]);

    return <>{membersByGroup}</>;
}

const GroupList = ({groups, getSelectedGroupId}: any) => {
    const [groupsBySpace, setGroupsBySpace] = useState(Array);

    const setSelectedGroupId = (groupId: number) => {
        getSelectedGroupId(groupId);
    }

    useEffect(() => {
        let groupBoxes = document.getElementsByClassName("group-box");

        const updatedGroups = groups.map(
            (g: any) => {

                /**
                 * 그룹 목록을 클릭했을 때
                 */
                const onClickGroup = (e: any) => {
                    e.preventDefault();

                    if (e.target.classList[1] === "group-box-clicked") {

                        e.target.classList.remove("group-box-clicked");
                        setSelectedGroupId(0);

                    } else {

                        for (let i = 0; i < groupBoxes.length; i++) {
                            groupBoxes[i].classList.remove("group-box-clicked");
                        }

                        e.target.classList.add("group-box-clicked");
                        setSelectedGroupId(g.groupId);
                    }
                }

                return (
                    <div key={g.groupId} id="group-box" className="group-box"
                         onClick={onClickGroup}>

                        {g.name}

                    </div>
                );

            });

        setGroupsBySpace(updatedGroups);

    }, [groups]);

    return <>{groupsBySpace}</>
}

const GroupMemberList = ({groups}: any) => {
    const [selectedGroupId, setSelectedGroupId] = useState(0);

    const getSelectedGroupId = (groupId: number) => {
        setSelectedGroupId(groupId);
    }

    // 1. 스페이스의 모든 그룹을 가져온다.
    // 2. 각 스페이스의 그룹을 클릭하면 해당 그룹의 멤버 목록을 보여준다.

    return (
        <div className="group-rectangle-white">

            <div className="group-title">
                Group & Member
            </div>

            <div className="groups-members-container">

                <div className="group-container">
                    <GroupList groups={groups} getSelectedGroupId={getSelectedGroupId}/>
                </div>

                <div className="group-member-container">
                    <MemberListByGroup groupId={selectedGroupId} groups={groups}/>
                </div>

            </div>

        </div>
    );
}

GroupMemberList.propTypes = {
    groups: PropTypes.array
}

export default GroupMemberList;
