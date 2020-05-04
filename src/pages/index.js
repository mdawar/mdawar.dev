import React from 'react';
import { graphql } from 'gatsby';

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
      {posts.map(({ id, excerpt, frontmatter }) => (
        <div key={id}>
          <h3>{frontmatter.title}</h3>
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

    allMdx {
      nodes {
        frontmatter {
          title
          description
          date(formatString: "MMMM DD, YYYY")
        }
        id
        excerpt
      }
    }
  }
`;
