import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import SEO from '../components/seo';
import Pagination from '../components/Pagination';
import { slugify } from '../utils';
import { Section, SectionHeader, Content } from '../styles/elements/content';

export default function TagsPage({ pageContext }) {
  const { pageItems: tags, currentPage, totalPages } = pageContext;
  const prevPage =
    currentPage - 1 === 1 ? '/blog/tags' : `/blog/tags/${currentPage - 1}`;
  const nextPage = `/blog/tags/${currentPage + 1}`;

  return (
    <>
      <SEO
        title="All Tags"
        description="List of all the blog tags"
        path="/blog/tags"
      />
      <Section>
        <SectionHeader>
          <h2>Tags</h2>
          <Link to="/blog">All posts</Link>
        </SectionHeader>
        <Content>
          <ul>
            {tags.map((tag) => (
              <li key={tag.name}>
                <Link to={`/blog/tags/${slugify(tag.name)}`}>
                  {tag.name} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </Content>
      </Section>
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

TagsPage.propTypes = {
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pageItems: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};
