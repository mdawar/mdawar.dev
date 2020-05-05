import React from 'react';
import { Link, graphql } from 'gatsby';

export default function TagsPage({ data }) {
  const tags = data.allMdx.group;

  return (
    <div>
      <h1>Tags</h1>
      <ul>
        {tags.map((tag) => (
          <li key={tag.name}>
            <Link to={`/tags/${tag.name.toLowerCase()}/`}>
              {tag.name} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </div>
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
