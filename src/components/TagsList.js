import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { PostTags } from '../styles/elements/post';
import { slugify } from '../utils';

function TagsList({ tags }) {
  return (
    <PostTags>
      {tags.map((tag, index) => (
        <li key={tag}>
          {!!index && ', '}
          <Link to={`/blog/tags/${slugify(tag)}`}>{tag}</Link>
        </li>
      ))}
    </PostTags>
  );
}

TagsList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default TagsList;
