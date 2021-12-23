import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BestSellerItem = ({ el, level, idx }) => {
  const className = 'items level' + level;

  return (
    <Link to={`/detail/${el.book_id}`}>
      <Book className={className}>
        <RankNum>{idx + 1}</RankNum>
        <BookCoverBox>
          <BookCoverImg src={el.thumbnail} alt="best seller" />
        </BookCoverBox>
        <BookInfo>
          <Title>{el.title}</Title>
          <Author>{el.author}</Author>
        </BookInfo>
      </Book>
    </Link>
  );
};

export default BestSellerItem;

const Book = styled.li`
  width: 200px;
  height: 300px;
  padding: 10px;
  margin-right: 10px;
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  &:hover {
    opacity: 0.5;
  }
`;

const RankNum = styled.span`
  font-size: 110px;
  font-family: 'Chakra Petch', sans-serif;
  color: ${({ theme }) => theme.white};
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  opacity: 0.9;
  position: absolute;
  bottom: 55px;
  left: 5px;
  z-index: 9;
`;

const BookCoverBox = styled.div`
  width: 100%;
  height: 80%;
`;

const BookCoverImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  max-width: 170px;
  line-height: 22px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.black};
  padding-bottom: 4px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Author = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.grey};
`;
