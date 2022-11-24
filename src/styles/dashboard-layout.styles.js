import styled from "styled-components";

const Layout = styled.div`
  grid-template-areas:
    "sidebar navbar navbar  navbar"
    "sidebar main main main";
  @media only screen and (max-width: 1023px) {
    grid-template-areas:
      "navbar"
      "main";
  }
`;

const Main = styled.div`
  grid-area: main;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const NavContainer = styled.div`
    grid-area: navbar;
`;

const SidebarContainer = styled.div`
    grid-area: sidebar;
`;

export { Layout, Main, NavContainer, SidebarContainer }