import React from 'react';
import { Link, graphql } from 'gatsby';
import { SectionHeader, Content } from '../styles/elements/content';

export default function TagsPage({ data }) {
  const tags = data.allMdx.group;

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
              <Link to={`/tags/${tag.name.toLowerCase()}`}>
                {tag.name} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Content>
    </>
  );
}

export const query = graphql`
  query AllTags {
    allMdx(limit: 2000) {
      group(field: frontmatter___tags) {
        name: fieldValue
        totalCount
      }
    }
  }
`;
