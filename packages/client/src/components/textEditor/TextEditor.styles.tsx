import styled from "styled-components";

export const TextareaStyled = styled.textarea`
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  line-height: 1.45em;
  box-sizing: content-box;
  max-width: inherit;
  resize: none;

  :hover {
    border: 1px solid black;
  }

  :active, :focus {
    outline: none;
    border-color: #1975d2;
    border-width: 2px;
    padding: 9px 14px;
  }

  &, & > * {
    font-family: "Roboto", sans-serif !important;
    font-size: 15px;
  }
`;
