import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import people from "../data/people.yaml";

// Gets a list of all publications from Semantic Scholar for which Daniel Genkin was an author
// groupAuthors is an array of Objects with the following keys:
//   dblpName :: string - Person's full name according to the people data
//   yearJoinedTheGroup :: int - The year this person joined the group (to exclude publications from before)
//   yearLeftTheGroup :: int - The year this person left the group (to exclude publications from after, if it is defined)
async function getAllPapers(groupAuthors) {
  const semanticScholarAuthorIds = ["2062558", "2295580685"];
  const enabledGroupAuthors = groupAuthors.filter(
    (author) => author.dblpEnabled
  );
  const fields =
    "title,authors,venue,url,publicationTypes,publicationDate,openAccessPdf,externalIds";
  const paperLists = await Promise.all(
    semanticScholarAuthorIds.map(async (authorId) => {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers?fields=${fields}&limit=250`
      );
      const responseJson = await response.json();
      return responseJson.data || [];
    })
  );

  const allPapers = paperLists
    .flat()
    .map((paper) => {
      const publicationYear = paper.publicationDate
        ? Number(paper.publicationDate.substring(0, 4))
        : NaN;
      const currentPaperAuthors = (paper.authors || []).map(
        (publicationAuthor) => publicationAuthor.name
      );
      let paperVenue = paper.venue || "";

      if (
        paperVenue === "CCS" ||
        paperVenue === "Conference on Computer and Communications Security"
      ) {
        paperVenue =
          "ACM Conference on Computer and Communications Security (CCS)";
      } else if (paperVenue === "SP") {
        paperVenue = "IEEE Symposium on Security and Privacy (Oakland)";
      }

      return {
        title: paper.title,
        year: publicationYear,
        venue: paperVenue,
        type: paper.publicationTypes || [],
        url:
          paper.openAccessPdf?.url ||
          (paper.externalIds?.DOI
            ? `https://doi.org/${paper.externalIds.DOI}`
            : paper.url),
        id: paper.paperId,
        authors: currentPaperAuthors,
      };
    })
    .filter((paper) => {
      return enabledGroupAuthors.some(
        (author) =>
          author.yearJoinedTheGroup <= paper.year &&
          (!author.yearLeftTheGroup || author.yearLeftTheGroup >= paper.year)
      );
    });

  let seenPaperIDs = {};
  let seenPaperTitles = {};
  const filteredPapers = allPapers.filter((paper) => {
    let id = paper.id;
    let title = paper.title.toLowerCase();
    let paperType = paper.type;
    const isPaperDuplicate =
      seenPaperIDs.hasOwnProperty(id) || seenPaperTitles.hasOwnProperty(title);
    const isDanielGenkinACoAuthor =
      paper.authors.includes("Daniel Genkin") ||
      paper.authors.includes("Genkin, Daniel");
    // Only allow conference or journal papers
    const isPeerReviewed =
      paperType.includes("Conference") || paperType.includes("JournalArticle");
    if (isPaperDuplicate || !isDanielGenkinACoAuthor || !isPeerReviewed) {
      return false;
    }
    if (id !== undefined) {
      seenPaperIDs[id] = true;
    }
    if (title !== undefined) {
      seenPaperTitles[title] = true;
    }
    return true;
  });
  filteredPapers.sort(
    (paper1, paper2) => Number(paper2.year) - Number(paper1.year)
  );
  return filteredPapers;
}

const ResearchList = (props) => {
  const PublicationList = props.publications.map((publication) => {
    return <ResearchListItem publication={publication} key={publication.id} />;
  });

  return <StyledResearchList>{PublicationList}</StyledResearchList>;
};

const ResearchComponent = ({ data }) => {
  // Use map to get a list of all authors in each key and store it in an array
  const groupAuthors = Object.keys(people).flatMap((key) => people[key]);
  let [allPapers, setAllPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let papers = await getAllPapers(groupAuthors);
      setAllPapers(papers);
    };
    fetchData();
  }, []);

  return (
    <section>
      <h2>Research</h2>
      <ResearchList publications={allPapers} />
    </section>
  );
};

function getAuthorListString(authorList) {
  if (authorList.length === 0) {
    return "";
  } else if (authorList.length === 1) {
    return authorList[0];
  }
  let authorListString = authorList[0];
  authorList.slice(1, authorList.length - 1).forEach((author) => {
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
        <a href={publication.url}>{publication.title}</a>
      </ResearchListTitle>
      <ResearchListExcerpt
        dangerouslySetInnerHTML={{
          __html: getAuthorListString(publication.authors),
        }}
      />

      <span>
        {publication.venue} {publication.year}
      </span>
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
