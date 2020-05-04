import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default ({ data }) => {
  const { frontmatter, body } = data.mdx;

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>Posted on: {frontmatter.date}</p>
      <MDXRenderer>{body}</MDXRenderer>
    </>
  );
};

export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
      body
    }
  }
`;
