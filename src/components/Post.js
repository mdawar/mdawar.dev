import React from 'react';
import { Link } from 'gatsby';
import { PostContainer, PostInfo, PostTags } from '../styles/elements/post';

export default function Post({ post }) {
  const { excerpt, frontmatter, fields } = post;

  return (
    <PostContainer>
      <h3>
        <Link to={fields.slug}>{frontmatter.title}</Link>
      </h3>
      <PostInfo>
        <time>{frontmatter.date}</time>
        <PostTags>
          {frontmatter.tags.map((tag, index) => (
            <li key={tag}>
              {!!index && ', '}
              <Link to={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
            </li>
          ))}
        </PostTags>
      </PostInfo>
      <p>{excerpt}</p>
    </PostContainer>
  );
}
