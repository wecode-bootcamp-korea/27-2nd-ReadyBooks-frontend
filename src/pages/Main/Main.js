import React from 'react';
import MyBooks from '../Main/MyBooks/MyBooks';
import styled from 'styled-components';
import BestSellerContainer from './BestSellerContainer/BestSellerContainer';
import BooksContainer from './BooksContainer/BooksContainer';
// import { useEffect } from 'react/cjs/react.development';

const Main = () => {
  let token = sessionStorage.getItem('Authorization') || '';

  return (
    <Background>
      <Container>
        {token && (
          <>
            <Title>
              <Subtitle>Are you Ready to read ?</Subtitle>
              My Books
            </Title>
            <Ground>
              <MyBooksContainer>
                <MyBooks />
              </MyBooksContainer>
            </Ground>
          </>
        )}

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
        <Ground>
          <BooksContainer />
        </Ground>
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
  margin-bottom: 50px;
`;

const MyBooksContainer = styled.div`
  width: 80vw;
  height: 600px;
  background-color: inherit;
  border: none;
  margin: 30px 0;
  /* border: 0.2px solid lightgrey; */
  position: relative;
  left: -400px;
`;

const Ground = styled.div`
  padding: 20px 0;
  margin: 10px 0 80px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding-top: 80px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.grey};
  margin-bottom: 6px;
  font-weight: normal;
  font-style: italic;
`;
