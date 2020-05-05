import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import {
  Container,
  SideBar,
  MainContent,
  Header,
  MainMenu,
  NavLink,
  Footer
} from '../styles/elements/layout';

export default function Layout({ children }) {
  const {
    site: {
      siteMetadata: { title, description }
    }
  } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );

  return (
    <Container>
      <SideBar>
        <Header>
          <h1>
            <Link to="/">{title}</Link>
          </h1>
          <p>{description}</p>
        </Header>
        <MainMenu>
          <ul>
            <li>
              <NavLink to="/">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/about">About me</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact me</NavLink>
            </li>
          </ul>
        </MainMenu>
      </SideBar>
      <MainContent>{children}</MainContent>
      <Footer>
        <p>&copy; 2020 All right reserved</p>
        <p>
          Made with <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </Footer>
    </Container>
  );
}
