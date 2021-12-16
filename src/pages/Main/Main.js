import React from 'react';
import MyBooks from '../Main/MyBooks/MyBooks';
import styled from 'styled-components';
import BestSellerContainer from './BestSellerContainer/BestSellerContainer';
import BooksContainer from './BooksContainer/BooksContainer';

const Main = () => {
  return (
    <Background>
      <Container>
        <MyBooksContainer>
          <MyBooks />
        </MyBooksContainer>
        <Title>
          <Subtitle>ReadyBooks's Pick </Subtitle>
          Best 10
        </Title>
        <Ground>
          <BestSellerContainer />
        </Ground>
        <Title>
          <Subtitle>e-books</Subtitle>
          전체보기
        </Title>
        <BooksContainer />
      </Container>
    </Background>
  );
};

export default Main;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 1040px;
  height: 100%;
`;

const MyBooksContainer = styled.div`
  height: 600px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  border: none;
`;

const Ground = styled.div`
  padding: 20px 0;
  margin: 10px 0 50px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-top: 40px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grey};
  margin-bottom: 6px;
  font-weight: normal;
  font-style: italic;
`;
