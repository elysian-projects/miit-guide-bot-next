import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SidebarFrame = styled.nav`
  margin: 0;
  padding: 0;
  background-color: #101827;
  color: white;
  position: relative;
  height: 100vh;
  min-width: 400px;
  max-width: 400px;
  overflow-y: scroll;
  animation-duration: .5s;

  // FIXME: this animation must not be played on page load
  /* &.open {
    animation: toggle_sidebar 0.5s ease-out reverse;
  } */

  &.closed {
    animation: toggle_sidebar 0.5s ease-in-out;
    margin-left: -400px;
  }

  // FIXME: this animation must be played when toggling the sidebar
  @keyframes toggle_sidebar {
    from {
      margin-left: 0;
    }
    to {
      margin-left: -400px;
    }
  }

  &.curtain {
    position: absolute;
    z-index: 9000;
    left: 0;
  }
`

export const SidebarWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 0 auto;
  padding: 10px 15px;
  max-width: 1170px;
`

export const SidebarBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  position: relative;

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
`

export const SidebarToggleButton = styled(IconButton)`
  z-index: 100000;
  position: absolute !important;
  right: -50px !important;
  color: white !important;
  box-shadow: 0 0 2px 2px black;
  background-color: #c5c5c5 !important;
`

export const SidebarDivider = styled.hr`
  width: 100%;
  height: 1px;
  border-radius: 2px;
  color: #8a8a8a;
`

export const SidebarItem = styled(NavLink)`
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
