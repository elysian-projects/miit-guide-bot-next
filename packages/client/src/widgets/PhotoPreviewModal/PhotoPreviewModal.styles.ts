import { Box } from "@mui/material";
import styled from "styled-components";

export const PhotoPreviewBoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80vh;
  background-color: #fff;
  border: 2px solid #000;
  overflow: hidden;

  * {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media(max-width: 800px) {
    width: calc(100% - 20px);
  }
`;
