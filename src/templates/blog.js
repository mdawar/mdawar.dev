import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Post from '../components/Post';
import Pagination from '../components/Pagination';
import { SectionHeader } from '../styles/elements/content';

export default function BlogPostsList({ pageContext }) {
  const { pageItems: posts, currentPage, totalPages } = pageContext;
  const prevPage = currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/${currentPage + 1}`;

  return (
    <>
      <SectionHeader>
        <h2>Blog</h2>
        <Link to="/blog/tags">All tags</Link>
      </SectionHeader>
      {posts.map(({ node }) => (
        <Post key={node.id} post={node} />
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

BlogPostsList.propTypes = {
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pageItems: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};
