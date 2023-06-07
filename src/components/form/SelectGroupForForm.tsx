import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const MemberListByGroup = ({groupId, groups}: any) => {
  const [membersByGroup, setMembersByGroup] = useState(Array);
  console.log("groupId",groups);
  useEffect(() => {

      let members = [];

      for (let i = 0; i < groups.length; i++) {
          if (groups[i].groupId === groupId[i]) {
              console.log("groups",groups[i]);
              members = groups[i].members;
              console.log("memebers",members);
          }
      }

      const updatedMembers = members.map(
          (m: any, i: number) => {

              return (
                  <div key={m.memberId} className="group-member-container"
                       style={{borderBottomWidth: i === members.length - 1 || members.length === 0 ? "0" : "0.05rem"}}>

                      <div className="group-member-id">#{m.memberId}    {m.name}</div>

                      

                  </div>
              );
          });

      setMembersByGroup(updatedMembers);

  }, [groupId, groups]);

  return <>{membersByGroup}</>;
}
interface GroupListProps {
  groups: any[];
  checkedList: number[];
  setCheckedList: (checkedList: number[]) => void;
}

const GroupList = ({ groups, checkedList, setCheckedList }: GroupListProps) => {
  const [groupsBySpace, setGroupsBySpace] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    const showGroups = groups.map((g: any) => {
      const checkGroupHandler = (value: number, isChecked: boolean) => {
        if (isChecked) {
          setCheckedList( [...checkedList, value]);
        } else {
          setCheckedList(checkedList.filter((item) => item !== value));
        }
      };

      const onClickGroup = (e: any, value: number) => {
        const isChecked = e.target.checked;
        checkGroupHandler(value, isChecked);
      };

      return (
        <div key={g.groupId} className="group-box">
          <input
            type="checkbox"
            id={g.groupId}
            checked={checkedList.includes(g.groupId)}
            onChange={(e) => onClickGroup(e, g.groupId)}
          />
          <label htmlFor={g.groupId}>{g.name}</label>
        </div>
      );
    });

    setGroupsBySpace(showGroups);
  }, [groups, checkedList, setCheckedList]);

  return <>{groupsBySpace}</>;
};

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  checkedList: PropTypes.array.isRequired,
  setCheckedList: PropTypes.func.isRequired,
};

interface SelectGroupForFormProps {
  groups: any[];
  checkedGroupList: (checkedList: number[]) => void;
  isOpen:(chooseGroupModalIsOpen:boolean)=>void;
}

const SelectGroupForForm = ({ groups, checkedGroupList,isOpen }: SelectGroupForFormProps) => {
  const [checkedList, setCheckedList] = useState<number[]>([]); // Check된 element 관리

  const handleSelectComplete = (e: any) => {
    e.preventDefault();
    checkedGroupList(checkedList);
    console.log("checkedList", checkedList);isOpen(false)
  };
  
  return (
    <div className="group-rectangle-white">
      <div className="group-title">Group & Member</div>
      <div className="groups-members-container">
        <div className="group-container">
          <GroupList groups={groups} checkedList={checkedList} setCheckedList={setCheckedList} />
        </div>
        <div className="group-member-container">
          <MemberListByGroup groupId={checkedList} groups={groups}/>
        </div>
        <div className="group-select-button-container">
          <button className="finish-select" onClick={handleSelectComplete}>
            선택완료
          </button>
        </div>
      </div>
    </div>
  );
};

SelectGroupForForm.propTypes = {
  groups: PropTypes.array.isRequired,
  checkedGroupList: PropTypes.func.isRequired,
};

export default SelectGroupForForm;