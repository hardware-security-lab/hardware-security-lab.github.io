import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Tags from "./tags";

const ResearchList = (props) => {
  const PublicationList = props.publications.map((publication) => {

    return (
      <ResearchListItem publication={publication}
        key={publication.id}
      />
    );
  });

  return <StyledPostList>{PublicationList}</StyledPostList>;
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

export default ResearchList;

const ResearchListItem = (props) => {
  const publication = props.publication;
  return (
    <StyledPostListItem>
      <Tags tags={[publication.type]} />

      <PostListTitle>
        <Link to={publication.url}>{publication.title}</Link>
      </PostListTitle>
      <PostListExcerpt
        dangerouslySetInnerHTML={{
          __html: getAuthorListString(publication.authors),
        }}
      />

        <span>{publication.venue} {publication.year}</span>

    </StyledPostListItem>
  );
};

const StyledPostList = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-items: center;
  grid-gap: var(--size-600);
  grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));

  @media screen and (max-width: 500px) {
    & {
      display: block;
    }
  }
`;

const StyledPostListItem = styled.li`
  display: flex;
  padding: 1.5rem;
  border-radius: 8px;
  position: relative;
  flex-direction: column;
  transition: all 0.3s ease-out;

  body.light-mode & {
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.3);
  }

  body.light-mode &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }

  body.dark-mode & {
    background-color: #3b3b3c;
    border: 1px solid #515151;
  }

  @media screen and (max-width: 500px) {
    & {
      margin-top: var(--size-600);
    }
  }
`;

const PostListTitle = styled.h2`
  line-height: 1.2;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: var(--size-600);
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
`;

const PostListExcerpt = styled.p`
  margin-top: auto;
  font-size: var(--size-500);
`;

const PostListMeta = styled.div`
  margin-top: 2rem;

  font-size: var(--size-300);
  display: flex;
  justify-content: space-between;
`;
