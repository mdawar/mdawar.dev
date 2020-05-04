import React from 'react';
import { graphql, Link } from 'gatsby';

export default ({ data }) => {
  const {
    site: {
      siteMetadata: { title, description }
    }
  } = data;

  const posts = data.allMdx.nodes;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
      {posts.map(({ id, excerpt, frontmatter, fields }) => (
        <div key={id}>
          <h3>
            <Link to={fields.slug}>{frontmatter.title}</Link>
          </h3>
          <p>Posted on: {frontmatter.date}</p>
          <p>{excerpt}</p>
        </div>
      ))}
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }

    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          description
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
