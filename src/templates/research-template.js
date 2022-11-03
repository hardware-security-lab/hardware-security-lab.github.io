import React, { useEffect, useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostList from '../components/post-list';
import ResearchList from '../components/research-list.js';
import styled from 'styled-components';
import StyledLink from '../components/styled-link';
import PeopleList from '../components/people.js';

// Gets a list of all publications from DBLP for which at least one group member was an author
// groupAuthors is an array of Objects with the following keys:
//   dblpName :: string - Person's full name according to DBLP
//   yearJoinedTheGroup :: int - The year this person joined the group (to exclude publications from before)
//   yearLeftTheGroup :: int - The year this person left the group (to exclude publications from after, if it is defined)
async function getAllPapers(groupAuthors) {
  const paperListPerAuthor = await Promise.all(groupAuthors.map(async author => {
      const dblpNameWithUnderscores = author.dblpName.replace(/ /g,"_");
      const response = await fetch("https://dblp.org/search/publ/api?q=author%3A" + dblpNameWithUnderscores + "%3A&format=json");
      const responseJson = await response.json();
      const hits = responseJson.result.hits.hit;
      let papers = [];
      if (!hits) {
          return [];
      }
      hits.forEach(hit => {
          const publicationYear = parseInt(hit.info.year);
          // If the yearLeftTheGroup is defined, we check the constraint, otherwise not.
          if (author.yearJoinedTheGroup <= publicationYear
              && (!author.yearLeftTheGroup || author.yearLeftTheGroup >= publicationYear)) {
              papers.push(
              {
                  "title": hit.info.title,
                  "year": Number(hit.info.year),
                  "venue": hit.info.venue,
                  "type": hit.info.type,
                  "url": hit.info.url,
                  "doi": hit.info.doi,
                  "id": hit["@id"],
                  "authors": hit.info.authors.author.map(publicationAuthor => publicationAuthor.text),
              });        
          }
      });
      return papers;
  }));
  const allPapers = paperListPerAuthor.flatMap(paper => paper);
  let seenPaperDOIs = {};
  let seenPaperIDs = {};
  const filteredPapers = allPapers.filter(paper => {
      let doi = paper.doi;
      let id = paper.id;
      if ((typeof(doi) !== "undefined" && seenPaperDOIs.hasOwnProperty(doi)) || seenPaperIDs.hasOwnProperty(id)) {
          return false;
      } else {
          seenPaperDOIs[doi] = true;
          seenPaperIDs[id] = true;
          return true;
      }
  });
  filteredPapers.sort((paper1, paper2) => Number(paper2.year) - Number(paper1.year));
  return filteredPapers;
}

const ResearchPage = ({ data }) => {
  const title = data.markdownRemark.frontmatter.title;
  const groupAuthors = [
    {dblpName: "Jason Kim 0007", yearJoinedTheGroup: 2021},
    {dblpName: "Pradyumna Shome", yearJoinedTheGroup: 2022},
    {dblpName: "Nureddin Kamadan", yearJoinedTheGroup: 2022},
    {dblpName: "Jie Jeff Xu", yearJoinedTheGroup: 2022},
    {dblpName: "Jakub Jackowiak", yearJoinedTheGroup: 2022},
    {dblpName: "Hritvik Taneja", yearJoinedTheGroup: 2022},
    {dblpName: "Ingab Kang", yearJoinedTheGroup: 2019},
    {dblpName: "Byeongyong Go", yearJoinedTheGroup: 2022},
    {dblpName: "Stephan van Schaik", yearJoinedTheGroup: 2020},
    {dblpName: "Andrew Kwong", yearJoinedTheGroup: 2018},
    {dblpName: "Daniel Genkin", yearJoinedTheGroup: 2018},
    {dblpName: "Walter Wang", yearJoinedTheGroup: 2022},
  ];
  let [allPapers, setAllPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let papers = await getAllPapers(groupAuthors);
      setAllPapers(papers);
    }
    fetchData();
  }, []);
  
  return (
    <Layout title={title}>
      <h1>Research</h1>
      <ResearchList publications={allPapers} />
    </Layout>
  );
};

export default ResearchPage;

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
