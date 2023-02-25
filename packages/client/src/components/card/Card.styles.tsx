import styled from "@emotion/styled";

export const CardWrapper = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media(max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(max-width: 530px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
