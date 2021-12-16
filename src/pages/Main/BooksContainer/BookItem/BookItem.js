import React from 'react';
import styled from 'styled-components';

const BookItem = ({ el }) => {
  const getAuthors = () => {
    for (let i = 0; i < el.author.length; i++) {
      return el.author.join(' | ');
    }
  };

  return (
    <Book>
      <BookCoverBox>
        <BookCoverImg src={el.thumbnail} alt={el.title} />
      </BookCoverBox>
      <BookInfo>
        <Title>{el.title}</Title>
        <Author>{getAuthors()}</Author>
      </BookInfo>
    </Book>
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
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px;
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grey};
`;
