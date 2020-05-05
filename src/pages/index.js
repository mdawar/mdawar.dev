import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

const PostWrapper = styled.div`
  margin-bottom: 2rem;
`;

export default function IndexPage({ data }) {
  const posts = data.allMdx.nodes;

  return (
    <>
      {posts.map(({ id, excerpt, frontmatter, fields }) => (
        <PostWrapper key={id}>
          <h3>
            <Link to={fields.slug}>{frontmatter.title}</Link>
          </h3>
          <p>Posted on: {frontmatter.date}</p>
          <p>{excerpt}</p>
        </PostWrapper>
      ))}
    </>
  );
}

export const query = graphql`
  query BlogPosts {
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
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
