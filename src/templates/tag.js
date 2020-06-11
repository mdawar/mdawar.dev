import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import SEO from '../components/seo';
import { Section, SectionHeader, Content } from '../styles/elements/content';

export default function TagPage({ data, pageContext }) {
  const { tag, slug } = pageContext;
  const { posts, totalCount } = data.allMdx;

  return (
    <>
      <SEO
        title={tag}
        description={`Articles published and tagged with ${tag}`}
        keywords={[tag]}
        path={slug}
      />
      <Section>
        <SectionHeader>
          <h2>
            {tag}
            <small>{` (${totalCount} post${
              totalCount === 1 ? '' : 's'
            })`}</small>
          </h2>
          <Link to="/blog/tags">All tags</Link>
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
      </Section>
    </>
  );
}

TagPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      posts: PropTypes.arrayOf(PropTypes.object).isRequired,
      totalCount: PropTypes.number.isRequired
    })
  }),
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired
  }).isRequired
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
