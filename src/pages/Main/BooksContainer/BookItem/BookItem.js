import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookItem = ({ el, id }) => {
  const getAuthors = () => {
    for (let i = 0; i < el.author.length; i++) {
      return el.author.join(' | ');
    }
  };

  return (
    <Link to={`/detail/${id}`}>
      <Book>
        <BookCoverBox>
          <BookCoverImg src={el.thumbnail} alt={el.title} />
        </BookCoverBox>
        <BookInfo>
          <Title>{el.title}</Title>
          <Author>{getAuthors()}</Author>
        </BookInfo>
      </Book>
    </Link>
  );
};

export default BookItem;

const Book = styled.div`
  width: 320px;
  height: 120px;
  padding: 10px;
  margin: 15px 10px;
  border-bottom: 2px solid ${({ theme }) => theme.veryLightGrey};
  box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: translateY(-15px);
    border-bottom: 2px solid ${({ theme }) => theme.pointCobalt};
    box-shadow: 0 5px 10px 1px rgba(150, 150, 250, 0.6);
  }
`;

const BookCoverBox = styled.div`
  width: 80px;
  height: 100px;
`;

const BookCoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px;
`;

const Title = styled.p`
  max-width: 170px;
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.black};
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Author = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grey};
`;
