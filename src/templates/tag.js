import React from 'react';
import { Link, graphql } from 'gatsby';
import { SectionHeader, Content } from '../styles/elements/content';

export default function TagPage({ data, pageContext }) {
  const { tag } = pageContext;
  const { posts, totalCount } = data.allMdx;

  const tagHeader = `${tag} (${totalCount} post${totalCount === 1 ? '' : 's'})`;

  return (
    <>
      <SectionHeader>
        <h2>
          {tag}
          <small>{` (${totalCount} post${totalCount === 1 ? '' : 's'})`}</small>
        </h2>
        <Link to="/tags">All tags</Link>
      </SectionHeader>
      <Content>
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
      </Content>
    </>
  );
}

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
