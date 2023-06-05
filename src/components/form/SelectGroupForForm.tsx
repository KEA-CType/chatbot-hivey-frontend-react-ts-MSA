import { useEffect, useState } from "react";
import PropTypes from "prop-types";

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
}

const SelectGroupForForm = ({ groups, checkedGroupList }: SelectGroupForFormProps) => {
  const [checkedList, setCheckedList] = useState<number[]>([]); // Check된 element 관리

  const handleSelectComplete = (e: any) => {
    e.preventDefault();
    checkedGroupList(checkedList);
    console.log("checkedList", checkedList);
  };

  return (
    <div className="group-rectangle-white">
      <div className="group-title">Group & Member</div>
      <div className="groups-members-container">
        <div className="group-container">
          <GroupList groups={groups} checkedList={checkedList} setCheckedList={setCheckedList} />
        </div>
        <div className="group-member-container"></div>
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