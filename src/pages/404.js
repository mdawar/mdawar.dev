import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import { Section, SectionHeader, Content } from '../styles/elements/content';

export default function NotFoundPage({ data }) {
  const posts = data.allMdx.nodes;

  return (
    <>
      <SEO title="Page Not Found" description="Sorry this page was not found" />
      <Section>
        <SectionHeader>
          <h2>Page Not Found</h2>
          <Link to="/">Go to the homepage</Link>
        </SectionHeader>
        <Content>
          <h3>Sorry, the page you are looking for was not found</h3>
          <p>This could be a typo, or the was page was removed.</p>
          <h4>You might find these latest blog posts interesting:</h4>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
          <Link to="/blog">View all the posts</Link>
        </Content>
      </Section>
    </>
  );
}

NotFoundPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired
    }).isRequired
  }).isRequired
};

export const query = graphql`
  query NotFoundPage {
    allMdx(
      filter: {
        fields: { collection: { eq: "posts" } }
        frontmatter: { published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      nodes {
        id
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;
