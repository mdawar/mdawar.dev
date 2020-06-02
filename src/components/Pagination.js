import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { horizontalBg } from '../styles/global';

function Pagination({
  className,
  currentPage,
  totalPages,
  prevLink,
  nextLink,
  prev,
  next
}) {
  const hasPages = currentPage && totalPages;
  const isFirst = hasPages && currentPage === 1;
  const isLast = hasPages && currentPage === totalPages;

  return (
    <nav className={className}>
      {isFirst ? (
        <span>First Page</span>
      ) : (
        prevLink && (
          <span>
            <Link to={prevLink} rel="prev">
              {prev}
            </Link>
          </span>
        )
      )}
      {hasPages && (
        <span>
          Page {currentPage} of {totalPages}
        </span>
      )}
      {isLast ? (
        <span>Last Page</span>
      ) : (
        nextLink && (
          <span className="next">
            <Link to={nextLink} rel="next">
              {next}
            </Link>
          </span>
        )
      )}
    </nav>
  );
}

Pagination.defaultProps = {
  prev: '← Previous Page',
  next: 'Next Page →'
};

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  prevLink: PropTypes.string,
  nextLink: PropTypes.string,
  prev: PropTypes.node,
  next: PropTypes.node
};

export default styled(Pagination)`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.padding}rem 0;

  span.next:only-child {
    margin-left: auto;
  }

  &::before {
    content: '';
    ${horizontalBg};
    position: absolute;
    width: 100%;
    height: 1px;
    top: 0;
    left: 0;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;

    span {
      margin: ${({ theme }) => theme.margin / 4}rem 0;
    }
  }
`;
