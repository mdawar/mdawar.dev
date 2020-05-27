import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../components/seo';
import TagsList from '../components/TagsList';
import Pagination from '../components/Pagination';
import { SectionHeader, Content } from '../styles/elements/content';
import { PostInfo } from '../styles/elements/post';

export default function BlogPostPage({ data, pageContext }) {
  const {
    mdx: { frontmatter, body },
    site: { siteMetadata: site }
  } = data;
  const { prev, next } = pageContext;

  return (
    <>
      <SEO
        title={frontmatter.title}
        author={site.author.name}
        description={frontmatter.description}
        keywords={frontmatter.tags}
      />
      <SectionHeader>
        <PostInfo>
          <h1>{frontmatter.title}</h1>
          <time>{frontmatter.date}</time>
          <TagsList tags={frontmatter.tags} />
        </PostInfo>
      </SectionHeader>
      <Content spaced>
        <MDXRenderer>{body}</MDXRenderer>
      </Content>
      {(prev || next) && (
        <Pagination
          prev={prev && `← ${prev.frontmatter.title}`}
          prevLink={prev && prev.fields.slug}
          next={next && `${next.frontmatter.title} →`}
          nextLink={next && next.fields.slug}
        />
      )}
    </>
  );
}

BlogPostPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired,
      body: PropTypes.string.isRequired
    })
  }),
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    prev: PropTypes.object,
    next: PropTypes.object
  }).isRequired
};

export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
      body
    }

    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`;
