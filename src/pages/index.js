import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Post from '../components/Post';
import { SectionHeader } from '../styles/elements/content';

export default function IndexPage({ data }) {
  const posts = data.allMdx.nodes;

  return (
    <>
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
    }).isRequired
  }).isRequired
};

export const query = graphql`
  query BlogPosts {
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
