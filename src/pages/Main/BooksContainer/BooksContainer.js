import React, { useEffect, useState } from 'react';
import BookItem from './BookItem/BookItem';
import Pagination from './Pagination/Pagination';
import styled from 'styled-components';
import { API } from '../../../config';

const BooksContainer = () => {
  const [bookList, setBookList] = useState([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const booksPerPage = 12;
  const indexOfLast = (currentPage - 1) * booksPerPage;

  // TODO 백엔드 통신 전체 데이터 페이지네이션 내용 받기
  const fetchData = async () => {
    const data = await fetch(
      `${API.books}?limit=${booksPerPage}&offset=${indexOfLast}`
    );
    const res = await data.json();
    setBookList(res.result);
  };

  const fetchDataPage = async () => {
    const data = await fetch(API.books);
    const response = await data.json();
    setTotalCount(response.result.length);
  };

  const lastPage = Math.ceil(totalCount / booksPerPage);

  useEffect(() => {
    (async () => {
      setIsBooksLoading(true);
      await fetchData();
      await fetchDataPage();
      setIsBooksLoading(false);
    })();
  }, []);

  return (
    <Background>
      {!isBooksLoading && (
        <BookList>
          {bookList &&
            bookList.map(el => <BookItem el={el} key={el.book_id} />)}
        </BookList>
      )}
      <Pagination
        fetchData={fetchData}
        lastPage={lastPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Background>
  );
};

export default BooksContainer;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BookList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  min-height: 600px;
`;
