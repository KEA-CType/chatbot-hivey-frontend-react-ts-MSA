import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const MemberListByGroup = ({groupId, groups}: any) => {
    const [membersByGroup, setMembersByGroup] = useState(Array);
    console.log("memberList groupId, groups",groupId,groups);
    useEffect(() => {

        let members = [];

        for (let i = 0; i < groups.length; i++) {
            if (groups[i].groupId === groupId) {
                members = groups[i].members;
            }
        }
        console.log("memberList members",members);
        const updatedMembers = members.map(
            (m: any, i: number) => {

                return (
                    <div key={m.memberId} className="group-member-container-by-group"
                         style={{borderBottomWidth: i === members.length - 1 || members.length === 0 ? "0" : "0.05rem"}}>


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
        console.log("groupList groups",groups);
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


const SelectGroupForForm= (  { groups}:any )=>{
    console.log("groups",groups);
    const [selectedGroupId, setSelectedGroupId] = useState(0);

    const getSelectedGroupId = (groupId: number) => {
        setSelectedGroupId(groupId);
    }
    return(<div className="group-rectangle-white">

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

SelectGroupForForm.propTypes={
    groups: PropTypes.array
}
export default SelectGroupForForm;