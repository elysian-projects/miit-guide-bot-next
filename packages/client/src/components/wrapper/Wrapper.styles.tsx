import styled from "styled-components";

export interface IWrapperProps {
  maxWidth?: string;
}

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 15px;
  margin: 0 auto;
  max-width: ${(props: IWrapperProps) => props.maxWidth || "100%"};
`

export const MainWrapper = styled(Wrapper)`
  max-width: 1000px;
`
