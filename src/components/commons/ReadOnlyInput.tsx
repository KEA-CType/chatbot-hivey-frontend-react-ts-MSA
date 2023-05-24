import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  /* width: calc(100% - 400px); */
  width: 60%;
  ${(props) => props.height && `height: ${props.height}px;`}
  padding: 10px;
  font-size: 14px;
  line-height: 20px;
`;

function ReadOnlyInput(props: any) {
    const {height, value, onChange} = props;
    return <StyledInput readOnly height={height} value={value} onChange={onChange}/>;
}

export default ReadOnlyInput;
