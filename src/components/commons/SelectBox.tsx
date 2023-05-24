import React from "react";
import styled from "styled-components";

const StyledSelectBox = styled.select`
  font-size: 0.9rem;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: white;
  color: gray;
  display: block;
  width: 60%;

  &:hover {
    color: black;
  }
`

function SelectBox(props: any) {
    const {title, options, onChange} = props;

    return (
        <StyledSelectBox onChange={onChange}>
            {/* 아래에서 props.defaultValue 부분은 없애도 된다. Default 값을 지정하고 싶을 때 사용한다. */}
            {props.options.map((option: any) => (
                <option key={option.id} value={option.value} defaultValue={String(props.defaultValue === option.value)}>
                    {option.name}
                </option>
            ))}
        </StyledSelectBox>
    );
}

export default SelectBox;
