import React, { useEffect, useState } from 'react';
import Layout from './layout';
import { Link } from "gatsby";
import Tags from "./tags";
import { graphql } from 'gatsby';
import PostList from './post-list';
import styled from 'styled-components';
import StyledLink from './styled-link';
import people from "../data/people.yaml";

// Gets a list of all publications from DBLP for which at least one group member was an author
// groupAuthors is an array of Objects with the following keys:
//   dblpName :: string - Person's full name according to DBLP
//   yearJoinedTheGroup :: int - The year this person joined the group (to exclude publications from before)
//   yearLeftTheGroup :: int - The year this person left the group (to exclude publications from after, if it is defined)
async function getAllPapers(groupAuthors) {
  const paperListPerAuthor = await Promise.all(groupAuthors.map(async author => {
      const dblpNameWithUnderscores = author.dblpName.replace(/ /g,"_");
      const response = await fetch("https://dblp.org/search/publ/api?q=author%3A" + dblpNameWithUnderscores + "%3A&h=250&format=json");
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
            const authors = Array.isArray(hit.info.authors.author)
              ? hit.info.authors.author.map(publicationAuthor => {
                  const authorInGroup = groupAuthors.find(author => author.dblpName === publicationAuthor.text);
                  return (authorInGroup && authorInGroup.displayName) || publicationAuthor.text;
                })
              : [hit.info.authors.author].map(publicationAuthor => {
                  const authorInGroup = groupAuthors.find(author => author.dblpName === publicationAuthor.text);
                  return (authorInGroup && authorInGroup.displayName) || publicationAuthor.text;
                });
              papers.push(
              {
                  "title": hit.info.title,
                  "year": Number(hit.info.year),
                  "venue": hit.info.venue,
                  "type": hit.info.type,
                  "url": hit.info.url,
                  "doi": hit.info.doi,
                  "id": hit["@id"],
                  "authors": authors,
              });        
          }
      });
      return papers;
  }));
  const allPapers = paperListPerAuthor.flatMap(paper => paper);
  let seenPaperDOIs = {};
  let seenPaperIDs = {};
  let seenPaperTitles = {};
  const filteredPapers = allPapers.filter(paper => {
      let doi = paper.doi;
      let id = paper.id;
      let title = paper.title;
      const isPaperDuplicate = seenPaperDOIs.hasOwnProperty(doi) || seenPaperIDs.hasOwnProperty(id) || seenPaperTitles.hasOwnProperty(title);
      const isDanielGenkinACoAuthor = paper.authors.includes("Daniel Genkin") || paper.authors.includes("Genkin, Daniel");
      if (typeof(doi) !== "undefined" || isPaperDuplicate || !isDanielGenkinACoAuthor) {
          return false;
      } 
      seenPaperDOIs[doi] = true;
      seenPaperIDs[id] = true;
      seenPaperTitles[title] = true;
      return true;
  });
  filteredPapers.sort((paper1, paper2) => Number(paper2.year) - Number(paper1.year));
  return filteredPapers;
}

const ResearchList = (props) => {
    const PublicationList = props.publications.map((publication) => {
      return (
        <ResearchListItem publication={publication}
          key={publication.id}
        />
      );
    });
  
    return <StyledResearchList>{PublicationList}</StyledResearchList>;
}


const ResearchComponent = ({ data }) => {
  // Use map to get a list of all authors in each key and store it in an array
  const groupAuthors = Object.keys(people).flatMap(key => people[key]);
  let [allPapers, setAllPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let papers = await getAllPapers(groupAuthors);
      setAllPapers(papers);
    }
    fetchData();
  }, []);
  
  return <section>
    <h2>Research</h2>
    <ResearchList publications={allPapers} />
  </section>
};

function getAuthorListString(authorList) {
  if (authorList.length === 0) {
    return "";
  } else if (authorList.length === 1) {
    return authorList[0];
  }
  let authorListString = authorList[0];
  authorList.slice(1, authorList.length - 1).forEach(author => {
    authorListString += ", " + author; 
  });
  authorListString += " and " + authorList[authorList.length - 1];
  return authorListString;
}

const ResearchListItem = (props) => {
  const publication = props.publication;
  return (
    <StyledResearchListItem>
      {/* <Tags ta  s={[publication.type]} /> */}

      <ResearchListTitle>
        <Link to={publication.url}>{publication.title}</Link>
      </ResearchListTitle>
      <ResearchListExcerpt
        dangerouslySetInnerHTML={{
          __html: getAuthorListString(publication.authors),
        }}
      />

        <span>{publication.venue} {publication.year}</span>

    </StyledResearchListItem>
  );
};

const StyledResearchList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-items: center;
  grid-gap: var(--size-150);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const StyledResearchListItem = styled.li`
  display: flex;
  padding: 1rem;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease-out;

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  
  @media screen and (max-width: 769px) {
    font-size: 0.75em;
  }
  }
`;

const ResearchListTitle = styled.h2`
  margin-top: 1rem;
  text-transform: capitalize;
  font-size: var(--size-200);
  font-weight: 700;

  & a {
    text-decoration: none;
    color: inherit;
  }

  & a::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  @media screen and (max-width: 769px) {
    font-size: 1.25em;
  }
`;

const ResearchListExcerpt = styled.p`
  margin-top: auto;
  font-size: var(--size-200);
  @media screen and (max-width: 769px) {
    font-size: 1em;
  }
`;

const ResearchListMeta = styled.div`
  margin-top: 0.2rem;

  font-size: var(--size-200);
  display: flex;
  justify-content: space-between;
`;

export default ResearchComponent;