import styled from "styled-components";

interface IWrapperProps {
  maxWidth?: string;
}

export const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  max-width: ${(props: IWrapperProps) => props.maxWidth || "100%"};
`
