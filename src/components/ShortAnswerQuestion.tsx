import React, {useState} from "react";
import styled from "styled-components";

import TextInput from "./commons/input";
import BlackButton from "./commons/buttons";

import iconEdit from "../assets/ic_edit_black.png";

const StyledDiv = styled.div`
  background-color: white;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px;
`;

function ShortAnswerQuestion({question}: any) {
    const [questionTitle, setQuestionTitle] = useState(question.title);
    const [questionAnswer, setQuestionAnswer] = useState("");
    const [editingQuestion, setEditingQuestion] = useState(false);

    const handleQuestionTitleChange = (event: any) => {
        setQuestionTitle(event.target.value);
    };

    const handleQuestionAnswerChange = (event: any) => {
        setQuestionAnswer(event.target.value);
    };

    const handleEditQuestion = () => {
        setEditingQuestion(true);
    };

    const handleSaveQuestion = () => {
        setEditingQuestion(false);
        question.title = questionTitle;
    };

    const handleCancelEdit = () => {
        setEditingQuestion(false);
        setQuestionTitle(question.title);
    };

    return (
        <div>
            {editingQuestion ? (
                <StyledDiv>
                    <table style={{width: "100%", borderSpacing: "3px"}}>
                        <tbody>
                        <tr>
                            <td>
                                <label>질문: </label>
                            </td>
                            <td>
                                <TextInput
                                    className="link-input"
                                    height={10}
                                    value={questionTitle || ""}
                                    onChange={handleQuestionTitleChange}
                                />
                            </td>
                            <td>
                                &nbsp;&nbsp;&nbsp;
                                <BlackButton title="저장하기" onClick={handleSaveQuestion}/>
                                <BlackButton title="취소하기" onClick={handleCancelEdit}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </StyledDiv>
            ) : (
                <div>
                    <h3 style={{display: "inline"}}>{question.title}</h3>
                    &nbsp;&nbsp;&nbsp;
                    <img
                        style={{width: "20px", height: "20px", cursor: "pointer"}}
                        className="edit"
                        alt="편집하기"
                        src={iconEdit}
                        onClick={handleEditQuestion}
                    />
                    <form>
                        <label>
                            <input
                                type="text"
                                value={questionAnswer}
                                onChange={handleQuestionAnswerChange}
                                maxLength={question.maxlength}
                            />
                        </label>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ShortAnswerQuestion;
