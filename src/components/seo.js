import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({ title, author, description, keywords, path }) {
  const {
    site: { siteMetadata: site }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
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
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {path && <link rel="canonical" href={`${site.url}${path}`} />}

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={site.title} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {path && <meta property="og:url" content={`${site.url}${path}`} />}

      {(title || description) && <meta name="twitter:card" content="summary" />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
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
