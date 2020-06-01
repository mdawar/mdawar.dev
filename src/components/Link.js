import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

export default function Link({ children, href }) {
  return href.startsWith('/') ? (
    <GatsbyLink to={href}>{children}</GatsbyLink>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}↗
    </a>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired
};
