import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import { Section, SectionHeader, Content } from '../styles/elements/content';

export default function AboutPage({ data }) {
  const { author } = data.site.siteMetadata;

  return (
    <>
      <SEO
        title="About me"
        description="Freelance web developer and Linux system administrator"
        keywords={['Web Developer', 'Linux System Administrator', 'Freelancer']}
        path="/about"
      />
      <Section>
        <SectionHeader>
          <h2>About me</h2>
        </SectionHeader>
        <Content>
          <p>
            Hi!, my name is <strong>{author.name}</strong>, I'm a self-taught
            freelance web developer and Linux system administrator.
          </p>
          <p>
            This is my personal blog where I post from time to time about
            various topics, including:
          </p>
          <ul>
            <li>
              <strong>Web development</strong>
            </li>
            <li>
              <strong>JavaScript</strong>
            </li>
            <li>
              <strong>Python</strong>
            </li>
            <li>
              <strong>Terraform</strong>
            </li>
            <li>
              <strong>Ansible</strong>
            </li>
            <li>
              <strong>Docker</strong>
            </li>
            <li>
              <strong>Linux</strong>
            </li>
          </ul>
          <p>You can find me on:</p>
          <ul>
            <li>
              <strong>Github: </strong>
              <a href={`https://github.com/${author.github}`}>
                {author.github}
              </a>
            </li>
            <li>
              <strong>Twitter: </strong>
              <a href={`https://twitter.com/${author.twitter}`}>
                @{author.twitter}
              </a>
            </li>
            <li>
              <strong>Email: </strong>
              <a href={`mailto:${author.email}`}>{author.email}</a>
            </li>
          </ul>
        </Content>
      </Section>
    </>
  );
}

AboutPage.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        author: PropTypes.shape({
          name: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
          twitter: PropTypes.string.isRequired,
          github: PropTypes.string.isRequired
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export const query = graphql`
  query Author {
    site {
      siteMetadata {
        author {
          name
          email
          twitter
          github
        }
      }
    }
  }
`;
