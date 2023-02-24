import { AppBar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MainWrapper } from "../wrapper";

export const HeaderContainer = styled(AppBar)`
  height: 50px;
  margin-bottom: 10px;
  box-shadow: 0 0 3px 2px #e2e2e2 !important;
`;

export const HeaderWrapper = styled(MainWrapper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  height: inherit;
`;

export const HeaderLogo = styled.h2``;

export const HeaderSection = styled.div`
  display: flex;
  gap: 10px;
`;

export const HeaderItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const HeaderLink = styled(Link)`
  color: black;
  text-decoration: none;
  position: relative;
`;

export const SidebarToggleButton = styled(IconButton)`
  display: none !important;

  @media(max-width: 1170px) {
    &.show {
      display: block !important;
    }
  }
`;
