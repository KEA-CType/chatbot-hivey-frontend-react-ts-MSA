import React, {useState} from "react";
import styled from "styled-components";

import Button from "./buttons";

import iconEdit from "../assets/ic_edit_black.png";
import TextInput from "./input";

const StyledDiv = styled.div`
  background-color: white;
  color: black;
  padding-top: 20px;
  padding-bottom: 20px;
`;

function MultipleChoiceQuestion({question}: any) {
    const [options, setOptions] = useState(question.options);
    const [newOption, setNewOption] = useState("");
    const [editingQuestion, setEditingQuestion] = useState(false);
    const [questionTitle, setQuestionTitle] = useState(question.title);

    const handleOptionChange = (index: any, event: any) => {
        const updatedOptions = [...options];
        updatedOptions[index] = event.target.value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, newOption]);
        setNewOption("");
    };

    const handleDeleteOption = (index: any) => {
        const updatedOptions = [...options];
        updatedOptions.splice(index, 1);
        setOptions(updatedOptions);
    };

    const handleQuestionTitleChange = (event: any) => {
        setQuestionTitle(event.target.value);
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
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{flex: 1}}>
                            <TextInput className="link-input" height={10} value={questionTitle || ""}
                                       onChange={handleQuestionTitleChange}/>
                        </div>
                        <div>
                            <Button className="HomeButtons" text="저장하기" onClick={handleSaveQuestion}/>
                            <Button className="HomeButtons" text="취소하기" onClick={handleCancelEdit}/>
                        </div>
                    </div>

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
                </div>
            )}
            <form>
                {options.map((option: any, index: any) => (
                    <div
                        key={index}
                        style={{paddingRight: "5px", paddingBottom: "5px"}}
                    >
                        <label>
                            <input
                                type="radio"
                                name={question.id}
                                value={option}
                                onChange={(event) => handleOptionChange(index, event)}
                            />
                            {option}
                        </label>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button
                            className="HomeButtons"
                            text="삭제하기"
                            onClick={(e) => {
                                e.preventDefault();
                                handleDeleteOption(index);
                            }}
                        />

                    </div>
                ))}
            </form>
        </div>
    );
}

export default MultipleChoiceQuestion;
