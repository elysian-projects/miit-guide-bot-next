import { Editable } from "slate-react";
import styled from "styled-components";

export const EditableStyled = styled(Editable)`
  padding: 10px 15px;
  margin: 8px 0;
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
  line-height: 1.45em;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;

  :hover {
    border: 1px solid black;
  }

  :active, :focus {
    border-color: #1975d2;
    border-width: 2px;
    padding: 9px 14px;
  }

  &, & > * {
    font-family: "Roboto", sans-serif !important;
    font-size: 15px;
  }
`
