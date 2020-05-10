import React from 'react';
import { graphql, Link } from 'gatsby';
import Post from '../components/Post';
import styled from 'styled-components';

const Pagination = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export default function BlogPostsList({ data, pageContext }) {
  const posts = data.allMdx.nodes;
  const { currentPage, totalPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {totalPages > 1 && (
        <Pagination>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              &larr; Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next" css={'margin-left: auto'}>
              Next Page &rarr;
            </Link>
          )}
        </Pagination>
      )}
    </>
  );
}

export const query = graphql`
  query BlogPostsList($limit: Int, $skip: Int!) {
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
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
