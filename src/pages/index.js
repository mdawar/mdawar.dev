import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

const PostWrapper = styled.div`
  margin-bottom: 2rem;
`;

const PostInfo = styled.div`
  margin-bottom: ${({ theme }) => theme.margin}rem;
`;

const PostTags = styled.ul`
  display: inline-block;
  margin-left: 0.5rem;

  li {
    display: inline;
  }

  a {
    /* border: none; */
    color: ${({ theme }) => theme.color.text};
  }

  &::before {
    content: '• ';
  }
`;

export default function IndexPage({ data }) {
  const posts = data.allMdx.nodes;

  return (
    <>
      {posts.map(({ id, excerpt, frontmatter, fields }) => (
        <PostWrapper key={id}>
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
        </PostWrapper>
      ))}
    </>
  );
}

export const query = graphql`
  query BlogPosts {
    allMdx(
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
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
