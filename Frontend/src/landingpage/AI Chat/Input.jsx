import React from "react";
import styled from "styled-components";

const Input = ({ value, onChange }) => {
  return (
    <StyledWrapper className="m-2">
      <input
        placeholder="Type something here...."
        className="input "
        name="text"
        type="text"
        value={value}
        onChange={onChange}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    color: black;
    border: 3px solid;
    border-radius: 10px;
    padding: 10px 25px;
    background: transparent;
    width: 300px;
  }

  @media (max-width: 640px) {
    .input {
      width: 210px;
    }
  }

  .input:active {
    box-shadow: 2px 2px 15px blue inset;
  }
`;

export default Input;
