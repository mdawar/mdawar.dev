import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Pagination from '../components/Pagination';
import { Content } from '../styles/elements/content';

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
        <Pagination
          prev={prev && `← ${prev.frontmatter.title}`}
          prevLink={prev && prev.fields.slug}
          next={next && `${next.frontmatter.title} →`}
          nextLink={next && next.fields.slug}
        />
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
