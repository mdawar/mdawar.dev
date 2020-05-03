import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default () => {
  const {
    site: {
      siteMetadata: { title, description },
    },
  } = useStaticQuery(
    graphql`
      query SiteMetadata {
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
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
};
