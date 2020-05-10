import React from 'react';
import { graphql } from 'gatsby';
import Post from '../components/Post';

export default function IndexPage({ data }) {
  const posts = data.allMdx.nodes;

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
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
