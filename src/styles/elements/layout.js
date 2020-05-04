import styled from 'styled-components';
import { Link } from 'gatsby';

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
    background: ${({ theme }) => theme.color.border};
    background: ${({ theme }) =>
      `linear-gradient(
          180deg,
          ${theme.color.bg} 0%,
          ${theme.color.border} 25%,
          ${theme.color.border} 75%,
          ${theme.color.bg} 100%
        )`};
    position: absolute;
    width: 0.01rem;
    height: 100%;
    top: 0;
    right: 0;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;

    &::after {
      width: 60%;
      height: 0.01rem;
      bottom: 0;
      top: auto;
      right: 20%;
      background: ${({ theme }) =>
        `linear-gradient(
          90deg,
          ${theme.color.bg} 0%,
          ${theme.color.border} 25%,
          ${theme.color.border} 75%,
          ${theme.color.bg} 100%
        )`};
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
    background: ${({ theme }) => theme.color.border};
    background: ${({ theme }) =>
      `linear-gradient(
        90deg,
        ${theme.color.bg} 0%,
        ${theme.color.border} 25%,
        ${theme.color.border} 75%,
        ${theme.color.bg} 100%
      )`};
    position: absolute;
    width: 100%;
    height: 0.01rem;
    top: 0;
    left: 0;
  }
`;
