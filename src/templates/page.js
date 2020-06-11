import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import SEO from '../components/seo';
import { Section, SectionHeader, Content } from '../styles/elements/content';

export default function MdxPage({ data, pageContext }) {
  const { frontmatter, body } = data.mdx;
  const { slug } = pageContext;

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords}
        path={slug}
      />
      <Section>
        <SectionHeader>
          <h2>{frontmatter.title}</h2>
        </SectionHeader>
        <Content>
          <MDXRenderer>{body}</MDXRenderer>
        </Content>
      </Section>
    </>
  );
}

MdxPage.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      frontmatter: PropTypes.object.isRequired,
      body: PropTypes.string.isRequired
    })
  })
};

export const query = graphql`
  query MdxPage($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        keywords
      }
      body
    }
  }
`;
