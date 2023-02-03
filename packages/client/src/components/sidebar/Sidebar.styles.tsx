import { Link } from "react-router-dom";
import styled from "styled-components";

export const SidebarFrame = styled.header`
  margin: 0;
  padding: 0;
  background-color: #101827;
  color: white;
  position: relative;
  height: 100vh;
  width: 400px;
  overflow-y: scroll;
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

// TODO: crop the image white space a bit
export const SidebarIcon = styled.span`
  background-image: url("/logo_large.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 64px;
  height: 64px;
`

export const SidebarDivider = styled.hr`
  width: 100%;
  height: 1px;
  border-radius: 2px;
  color: #8a8a8a;
`

export const SidebarItem = styled(Link)`
  display: flex;
  width: 100%;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 500;
  gap: 5px;
  color: #A1A8B4 !important;
  border-radius: 8px;

  .active, :hover {
    color: #16a17a !important;
    background-color: #242A38;
    cursor: pointer;
  }
`
