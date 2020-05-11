import styled from 'styled-components';
import { Link } from 'gatsby';
import { horizontalBg, verticalBg } from '../global';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 960px;
  margin: 0 auto;

  @media screen and (min-width: 1215px) {
    max-width: 1070px;
  }
`;

export const SideBar = styled.div`
  width: 25%;
  position: relative;
  padding: ${({ theme }) => theme.padding}rem;

  &::after {
    content: '';
    ${verticalBg};
    position: absolute;
    width: 1px;
    height: 100%;
    top: 0;
    right: 0;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;

    &::after {
      width: 60%;
      height: 1px;
      bottom: 0;
      top: auto;
      right: 20%;
      ${horizontalBg};
    }
  }
`;

export const MainContent = styled.main`
  width: 75%;
  padding: ${({ theme }) => theme.padding}rem;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const Header = styled.header`
  margin-bottom: 2rem;

  h1 a {
    color: ${({theme}) => theme.color.text};
    border: none;
  }

  @media screen and (max-width: 1024px) {
    text-align: center;
  }
`;

export const MainMenu = styled.nav`
  li {
    margin: ${({ theme }) => theme.padding / 4}rem 0;
  }

  @media screen and (max-width: 1024px) {
    ul {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
    }

    li {
      margin: ${({ theme }) => theme.padding / 4}rem;
    }
  }
`;

export const NavLink = styled(Link).attrs({ activeClassName: 'active' })`
  color: ${({ theme }) => theme.color.text};

  &.active {
    border-bottom-style: solid;
  }
`;

export const Footer = styled.footer`
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.padding}rem;
  text-align: center;

  &::before {
    content: '';
    ${horizontalBg};
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
  }
`;
