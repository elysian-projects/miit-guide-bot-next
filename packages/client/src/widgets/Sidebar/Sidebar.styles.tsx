import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const SIDEBAR_WIDTH = "300px";

const SIDEBAR_MOBILE_MODE_WIDTH = "1170px";
const SIDEBAR_FULL_SCREEN_MAX_WIDTH = "450px";

export const SidebarFrame = styled.nav`
  position: relative;
  margin: 0;
  padding: 0;
  color: white;
  height: 100vh;

  /**
   * These params are required as the sidebar is somehow effected when
   * there is the component 'Box' with prop 'component="form"' from '@mui/material'
   * in the layout, and if there's no constant values for these properties
   * the sidebar starts to shrink and grow between pages
   */
  line-height: 1.2;
  letter-spacing: normal;

  /* Somehow this is the only way to make it adjust with the right width */
  width: ${SIDEBAR_WIDTH};
  min-width: ${SIDEBAR_WIDTH};
  max-width: ${SIDEBAR_WIDTH};

  transition: margin 0.2s ease-in-out;
  margin-left: 0px;

  @media(max-width: ${SIDEBAR_MOBILE_MODE_WIDTH}) {
    z-index: 9000;
    position: fixed;
    top: 0;
    bottom: 0;

    /* Sidebar can only be toggled when the screen size is low and the sidebar is in mobile mode */
    &.closed {
      margin-left: -${SIDEBAR_WIDTH};
    }
  }

  @media(max-width: ${SIDEBAR_FULL_SCREEN_MAX_WIDTH}) {
    &.closed {
      margin-left: -100vw;
    }

    &:not(.closed) {
      width: 100vw;
    }
  }
`;

export const SidebarWrapper = styled.div`
  background-color: #101827;
  width: inherit;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding: 10px 15px;
  overflow-y: scroll;
  overflow-x: visible;
  z-index: 6000;
  position: fixed;
`;

export const SidebarDarkBackground = styled.div`
  position: fixed;
  z-index: 5000;
  background-color: #000;
  opacity: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 1px;
  height: 1px;

  transition: opacity 0.2s ease-in-out;

  @media(max-width: 1170px) {
    &.show {
      width: 100vw;
      height: 100vh;
      opacity: 0.4;
    }
  }
`;

export const SidebarBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

  >* {
    width: 100%;
  }

  >a {
    color: #000;
    text-decoration: none;
    transition-duration: .2s;

    :hover {
      color: #2f71ff;
    }
  }
`;

export const SidebarLogo = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  padding: 5px;
  justify-content: center;
`;

export const SidebarDivider = styled.hr`
  width: 100%;
  height: 1px;
  border-radius: 2px;
  color: #8a8a8a;
`;

const baseSidebarItemStyles = css`
  display: flex;
  width: 100%;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 500;
  gap: 5px;
  color: #A1A8B4 !important;
  border-radius: 8px;

  &.active, :focus-visible, :hover {
    color: #16a17a !important;
    background-color: #242A38;
    cursor: pointer;
  }

  :focus-visible {
    outline: none;
    box-shadow: 0 0 1px 1px #16a17a;
  }
`;

export const SidebarItem = styled.div`
  ${baseSidebarItemStyles}
`;

export const SidebarLinkItem = styled(NavLink)`
  ${baseSidebarItemStyles}
`;
