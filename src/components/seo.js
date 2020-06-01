import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

export default function SEO({
  title,
  author,
  description,
  keywords,
  path,
  article
}) {
  const {
    site: { siteMetadata: site }
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            name
            siteUrl
          }
        }
      }
    `
  );

  return (
    <Helmet titleTemplate={`%s - ${site.name}`} defaultTitle={site.name}>
      <html lang="en" />
      <meta charSet="utf-8" />

      {title && <title>{title}</title>}
      {author && <meta name="author" content={author} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {path && <link rel="canonical" href={`${site.siteUrl}${path}`} />}

      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={site.name} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {path && <meta property="og:url" content={`${site.siteUrl}${path}`} />}
      {article && article.published_time && (
        <meta
          property="article:published_time"
          content={article.published_time}
        />
      )}
      {article && article.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article &&
        article.tags &&
        article.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

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
  path: PropTypes.string,
  article: PropTypes.shape({
    published_time: PropTypes.string,
    author: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string)
  })
};
