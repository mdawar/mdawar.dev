import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery } from 'gatsby';

export default function SEO({ title, author, description, keywords, path }) {
  const {
    site: { siteMetadata: site }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            keywords
            url
          }
        }
      }
    `
  );

  return (
    <Helmet titleTemplate={`%s - ${site.title}`} defaultTitle={site.title}>
      <html lang="en" />
      <meta charSet="utf-8" />
      {title && <title>{title}</title>}
      {author && <meta name="author" content={author} />}
      <meta name="description" content={description || site.description} />
      <meta name="keywords" content={(keywords || site.keywords).join(', ')} />
      {path && <link rel="canonical" href={`${site.url}${path}`} />}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  path: PropTypes.string
};
