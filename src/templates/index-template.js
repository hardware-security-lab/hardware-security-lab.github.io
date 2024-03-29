import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import styled from 'styled-components';
import PeopleList from '../components/people.js';
import ServerSection from '../components/server-section.js';
import ResearchComponent from '../components/research-component.js';
import groupPhoto from "../../static/images/group_photo_fall_2023.webp";
import HighlightedProjects from '../components/highlighted-projects';

const HomePage = ({ data }) => {
  const intro = data.markdownRemark.html;
  const title = data.markdownRemark.frontmatter.title;
  
  return (
    <Layout title={title}>
      <img id="group-photo" src={groupPhoto} alt="Group photo"
      css={`
        text-align: center;
        margin: auto;
      `}/>
      <Intro
        dangerouslySetInnerHTML={{
          __html: intro,
        }}
      />

      <PeopleList/>
      <HighlightedProjects/>
      <ServerSection/>
      <ResearchComponent/>
    </Layout>
  );
};

export default HomePage;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60ch;
  align-items: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: var(--size-800);
  margin-bottom: var(--size-900);
  text-align: center;

  & p {
    font-size: var(--size-400);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }
  }
`;

export const pageQuery = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { order: DESC, fields: frontmatter___date }
      limit: 9
    ) {
      nodes {
        fields {
          slug
        }
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          description
          title
          tags
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
