import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Content, Pagination } from '../styles/elements/content';

export default function BlogPostPage({ data, pageContext }) {
  const { frontmatter, body } = data.mdx;
  const { prev, next } = pageContext;

  return (
    <>
      <Content>
        <h1>{frontmatter.title}</h1>
        <p>Posted on: {frontmatter.date}</p>
        <MDXRenderer>{body}</MDXRenderer>
      </Content>
      {(prev || next) && (
        <Pagination>
          {prev && (
            <Link to={prev.fields.slug} rel="prev">
              &larr; Previous: {prev.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next">
              Next: {next.frontmatter.title} &rarr;
            </Link>
          )}
        </Pagination>
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
