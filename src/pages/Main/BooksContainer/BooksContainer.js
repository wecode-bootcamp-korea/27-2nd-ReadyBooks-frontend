import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import BookItem from './BookItem/BookItem';
import Pagination from './Pagination/Pagination';
import styled from 'styled-components';
// import { API } from '../../../config';

const BooksContainer = () => {
  const [bookList, setBookList] = useState([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  // const [onPage, setOnPage] = useState(true); // 페이지 클릭할 때 페이지num 스타일링
  // const navigate = useNavigate();

  // TODO 백엔드 통신 전체 데이터 페이지네이션 내용 받기
  // const fetchData = async () => {
  //   const data = await fetch(`${API.books}?limit=${booksPerPage}&offset=0`);
  //   // const data = await fetch(
  //   //   `${API.books}?limit=${booksPerPage}&offset=${indexOfLast}`
  //   // );
  //   const res = await data.json();
  //   setBookList(res.result); // res.~~ 로 받아오기
  // };

  // 목데이터로 데이터 모두 받아오기
  const fetchData = async () => {
    const data = await fetch('/data/bookData.json');
    const res = await data.json();
    setBookList(res);
  };

  useEffect(() => {
    (async () => {
      setIsBooksLoading(true);
      await fetchData();
      setIsBooksLoading(false);
    })();
  }, []);

  const booksPerPage = 12; // 한 페이지에 데이터 갯수분량 등분
  const indexOfLast = (currentPage - 0) * booksPerPage;
  const indexOfFirst = indexOfLast - booksPerPage;

  const showCurrentBooks = arr => {
    let currentBooks = 0;
    currentBooks = arr.slice(indexOfFirst, indexOfLast);

    return currentBooks;
  };

  // const onClickPage = () => {
  //   setOnPage(prev => !prev);
  // };

  return (
    <Background>
      {!isBooksLoading && (
        <BookList>
          {showCurrentBooks(bookList).map(el => (
            <BookItem el={el} key={el.id} id={el.id} />
          ))}
          {/* 통신할 때 */}
          {/* {bookList.map(el => (
            <BookItem el={el} key={el.id} />
          ))} */}
        </BookList>
      )}
      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={bookList.length}
        // onClickPage={onClickPage}
        setCurrentPage={setCurrentPage} // 목데이터로 모든 데이터 받아올 때 씀
        fetchData={fetchData} // 데이터 끊어서 통신할 때 쓰는 props
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
  min-height: 560px;
`;
