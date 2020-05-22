import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import TagsList from './TagsList';
import { PostContainer, PostInfo } from '../styles/elements/post';

function Post({ post }) {
  const { excerpt, frontmatter, fields } = post;

  return (
    <PostContainer>
      <h3>
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h3>
      <PostInfo spaced>
        <time>{frontmatter.date}</time>
        <TagsList tags={frontmatter.tags} />
      </PostInfo>
      <p>{excerpt}</p>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default Post;
