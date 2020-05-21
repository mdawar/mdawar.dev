import React from 'react';
import { Link } from 'gatsby';
import { SectionHeader, Content, Pagination } from '../styles/elements/content';

export default function TagsPage({ pageContext }) {
  const { pageItems: tags, currentPage, totalPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog/tags' : `/blog/tags/${currentPage - 1}`;
  const nextPage = `/blog/tags/${currentPage + 1}`;

  return (
    <>
      <SectionHeader>
        <h2>Tags</h2>
        <Link to="/blog">All posts</Link>
      </SectionHeader>
      <Content>
        <ul>
          {tags.map((tag) => (
            <li key={tag.name}>
              <Link to={`/blog/tags/${tag.name.toLowerCase()}`}>
                {tag.name} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Content>
      {totalPages > 1 && (
        <Pagination>
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              &larr; Previous Page
            </Link>
          )}
          {!isLast && (
            <Link to={nextPage} rel="next">
              Next Page &rarr;
            </Link>
          )}
        </Pagination>
      )}
    </>
  );
}
