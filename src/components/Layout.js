import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery, Link } from 'gatsby';
import SEO from './seo';
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
      siteMetadata: { title, description, navigation }
    }
  } = useStaticQuery(
    graphql`
      query SiteMetadataQuery {
        site {
          siteMetadata {
            title
            description
            navigation {
              link
              name
            }
          }
        }
      }
    `
  );

  return (
    <>
      <SEO />
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
              {navigation.map((item) => (
                <li key={item.link}>
                  <NavLink to={item.link}>{item.name}</NavLink>
                </li>
              ))}
            </ul>
          </MainMenu>
        </SideBar>
        <MainContent>{children}</MainContent>
        <Footer>
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
          <p>
            Made with <a href="https://www.gatsbyjs.org">Gatsby</a> and hosted
            on <a href="https://www.netlify.com/">Netlify</a>
          </p>
        </Footer>
      </Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
