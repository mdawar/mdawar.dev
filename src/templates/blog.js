import React from 'react';
import { graphql, Link } from 'gatsby';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { SectionHeader } from '../styles/elements/content';

export default function BlogPostsList({ data, pageContext }) {
  const posts = data.allMdx.nodes;
  const { currentPage, totalPages } = pageContext;
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  return (
    <>
      <SectionHeader>
        <h2>Blog</h2>
        <Link to="/blog/tags">All tags</Link>
      </SectionHeader>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          prevLink={prevPage}
          nextLink={nextPage}
        />
      )}
    </>
  );
}

export const query = graphql`
  query BlogPostsList($limit: Int!, $skip: Int!) {
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
