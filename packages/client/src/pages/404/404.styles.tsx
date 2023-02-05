import styled from "styled-components";
import { MainWrapper } from "../../components/wrapper";

export const NotFoundWrapper = styled(MainWrapper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  text-align: center;
  gap: 10px;
  max-width: 700px;
`

export const NotFoundCode = styled.h1`
  margin: 0;
  padding: 0;
  font-size: max(calc(10vw), 100px);
  text-shadow: 0 2px 2px 2px #01FBC3;
`
