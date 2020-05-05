import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

export default function BlogPostPage({ data, pageContext }) {
  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <p>Posted on: {frontmatter.date}</p>
      <MDXRenderer>{body}</MDXRenderer>
      {previous && (
        <Link to={previous.fields.slug}>
          Previous: {previous.frontmatter.title}
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug}>Next: {next.frontmatter.title}</Link>
      )}
    </>
  );
}

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
