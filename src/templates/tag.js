import React from 'react';
import { Link, graphql } from 'gatsby';

export default ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { posts, totalCount } = data.allMdx;

  const tagHeader = `${tag} (${totalCount} post${totalCount === 1 ? '' : 's'})`;

  return (
    <div>
      <h1>{tagHeader}</h1>
      <ul>
        {posts.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;

          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/tags">All tags</Link>
    </div>
  );
};

export const query = graphql`
  query PostsByTag($tag: String!) {
    allMdx(
      limit: 2000
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      posts: edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
