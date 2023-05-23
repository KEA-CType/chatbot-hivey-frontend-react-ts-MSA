import "../../styles/enterspace.css";

import React, { useState } from "react";
import Button from "../../components/buttons";
import Input from "../../components/input";
import Modal from "../../components/modals";
import linkImg from "../../assets/ic_link_brown.png";
import Chatbot from "../../components/chatbot/chatbot";
import {userState, spaceState, memberIdState} from "../../commons/Atom";
import { useRecoilState, useRecoilValue } from "recoil";

import { Link } from "react-router-dom";

import spaces from "../../services/space/space";

const EnterSpaceComponent = () => {
  const [link, setLink] = useState("");
  const [linkError, setLinkError] = useState(""); // 링크가 존재하지 않을 때 출력할 경고문구
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const user = useRecoilValue(userState);
  const [space, setSpace] = useRecoilState(spaceState);
  const [memberId, setMemberId] = useRecoilState(memberIdState);

  /**
   * 스페이스 초대 링크를 입력했을 때 실행하는 함수인데,
   * 링크에서 코드로 변경하였으므로 코드를 입력했을 때 실행하는 함수이다.
   */
  const handleCodeChange = (e: any) => {
    const inputCode = e.target.value;
    setAccessCode(inputCode);
  };

  /**
   * 완료 버튼을 클릭 이벤트 함수
   */
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (linkError) {
      return;
    }

    // handle login submit
    spaces
      .EnterSpace(user.id, accessCode)
      .then((response: any) => {
        // 위의 함수에서 response.data를 받아온다.
        const { isSuccess, code, message } = response;
        console.log(`response: ${JSON.stringify(response)}`);
        const { memberId, spaceId } = response.result;
        console.log(`response: ${JSON.stringify(response.result)}`);

        if (code === 1000) {
          var msg = `Space에 ${memberId}로 입장하셨습니다.`;
          setIsModalOpen(true);
          setMessage(msg);
          // handle login success

          setMemberId(memberId);
          setSpace({
              id: spaceId, name: space.name
          });
        } else if (code === 2020) {
          setIsModalOpen(true);
          setMessage(message);
          // handle login failure
        }
      })
      .catch((error) => {
        console.log(error);
        setIsModalOpen(true);
        setMessage("스페이스 가입에 실패하였습니다.");
      });
  };

  return (
    <div className="enterSpace-container">
      <form className="enter-space" onSubmit={handleSubmit}>
        <div className="title">Enter Space</div>
        <br />
        <div className="link-text">
          Access Code
          <img className="link" src={linkImg} alt="link img" />
        </div>
        <Input
          type="text"
          placeholder="AccessCode"
          value={accessCode}
          onChange={handleCodeChange}
          className="link-input"
        />
        <Button className="enterSpace-button" text="Enter Space" />
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{message}</p>
        <Link to="/part">
          <Button className="enterSpace-button" text="Enter" />
        </Link>
      </Modal>
      <Chatbot />
    </div>
  );
};

// <Link to="/space" state={{ spaceId: spaceId, userId: memberId }}>
// SpaceForMember.jsx, SpaceForLeader.tsx => 스페이스 역할 불러와서 판단후 정보 state로 넘겨주기

const SpaceEnter = () => {
  return (
    <div className="enterpage">
      <EnterSpaceComponent />
    </div>
  );
};

export default SpaceEnter;

// space로 userId, spaceId,
