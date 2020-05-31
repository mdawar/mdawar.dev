import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Post from '../components/Post';
import { Section, SectionHeader } from '../styles/elements/content';
import Projects from '../components/Projects';

export default function IndexPage({ data }) {
  const {
    allMdx: { nodes: posts },
    site: { siteMetadata: site }
  } = data;

  return (
    <>
      <SEO
        title={site.author.name}
        description={site.description}
        keywords={site.keywords}
        path="/"
      />
      <Section>
        <SectionHeader>
          <h2>Latest Posts</h2>
          <Link to="/blog">All posts</Link>
        </SectionHeader>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </Section>
      <Projects />
    </>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired
    }).isRequired,
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        description
        keywords
        author {
          name
        }
      }
    }

    allMdx(
      filter: {
        fields: { collection: { eq: "posts" } }
        frontmatter: { published: { eq: true } }
      }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
          description
          tags
          date(formatString: "MMMM DD, YYYY")
        }
        id
        excerpt
        fields {
          slug
        }
      }
    }
  }
`;
