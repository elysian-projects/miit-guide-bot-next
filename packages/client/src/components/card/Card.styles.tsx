import styled from "@emotion/styled";
import { ListView } from "../../types";

interface ICardWrapperProps {
  view?: ListView
}

export const CardWrapper = styled.div<ICardWrapperProps>`
  position: relative;

  ${props => !props.view || props.view === "grid" ? `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;

    @media(max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(max-width: 530px) {
      grid-template-columns: repeat(1, 1fr);
    }
  ` : `
    display: flex;
    flex-direction: column;
    gap: 5px;

    * {
      display: flex !important;
      justify-content: space-between;
    }
  `}
`;
