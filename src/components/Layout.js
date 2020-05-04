import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

export default ({ children }) => {
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
    <>
      <header>
        <h1>
          <Link to="/">{title}</Link>
        </h1>
        <p>{description}</p>
      </header>
      <main>{children}</main>
      <footer>&copy; 2020 All right reserved</footer>
    </>
  );
};
