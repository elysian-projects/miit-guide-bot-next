import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const SidebarFrame = styled.nav`
  margin: 0;
  padding: 0;
  color: white;
  height: 100vh;
  min-width: 400px;
  max-width: 400px;

  transition: margin 0.2s;
  margin-left: 0px;

  /* Making it not connected to the content layout floating on the left side */
  @media(max-width: 1170px) {
    z-index: 9000;
    position: fixed;
    top: 0;
    bottom: 0;

    /* Sidebar can only be toggled when the screen size is low and the sidebar is in mobile mode */
    &.closed {
      margin-left: -400px;
    }
  }

  @media(max-width: 400px) {
    min-width: 100vw;
    max-width: 100vw;
  }
`

export const SidebarWrapper = styled.div`
  background-color: #101827;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
  padding: 10px 15px;
  max-width: 1170px;
  overflow-y: scroll;
  z-index: 6000;
  overflow-x: visible;
`

export const SidebarDarkBackground = styled.div`
  position: fixed;
  z-index: 5000;
  background-color: #000;
  opacity: 0;
  display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  @media(max-width: 1170px) {
    &.show {
      display: block;
      opacity: 0.4;
    }
  }
`

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
    color: black;
    text-decoration: none;
    transition-duration: .2s;

    :hover {
      color: #2f71ff;
    }
  }
`

export const SidebarLogo = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 600;
  padding: 5px;
  justify-content: center;
`

export const SidebarDivider = styled.hr`
  width: 100%;
  height: 1px;
  border-radius: 2px;
  color: #8a8a8a;
`

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
`

export const SidebarItem = styled.div`
  ${baseSidebarItemStyles}
`

export const SidebarLinkItem = styled(NavLink)`
  ${baseSidebarItemStyles}
`
