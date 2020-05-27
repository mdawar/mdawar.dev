import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import SEO from '../components/seo';
import Post from '../components/Post';
import { SectionHeader } from '../styles/elements/content';

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
      <section>
        <SectionHeader>
          <h2>Latest Posts</h2>
          <Link to="/blog">All posts</Link>
        </SectionHeader>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </section>
      <section>
        <SectionHeader>
          <h2>Projects</h2>
        </SectionHeader>
        <h3>
          <a href="https://github.com/mdawar/terraformjs">TerraformJS</a>
        </h3>
        <p>Infrastructure as code using JavaScript and Terraform.</p>
        <h3>
          <a href="https://github.com/mdawar/rq-exporter">RQ Exporter</a>
        </h3>
        <p>Prometheus metrics exporter for Python RQ (Redis Queue).</p>
      </section>
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
  query BlogPosts {
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
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      nodes {
        frontmatter {
          title
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
