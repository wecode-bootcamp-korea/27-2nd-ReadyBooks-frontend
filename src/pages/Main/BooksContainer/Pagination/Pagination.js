import React from 'react';
import styled from 'styled-components';

const Pagination = ({
  booksPerPage,
  totalBooks,
  setCurrentPage,
  fetchData,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PageUl>
      {pageNumbers.map(num => (
        <PageLi key={num}>
          <PageButton
            onClick={
              () => {
                setCurrentPage(num);
              }
              // fetchData
            }
          >
            {num}
          </PageButton>
        </PageLi>
      ))}
    </PageUl>
  );
};

export default Pagination;

const PageUl = styled.ul`
  display: flex;
  justify-content: space-between;
  margin: 20px;
`;

const PageLi = styled.li`
  font-weight: bold;
  margin: 0 10px;
`;

const PageButton = styled.button`
  font-size: 15px;
  color: ${({ theme }) => theme.grey};
  border: 0;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.pointCobalt};
    font-weight: bold;
  }
`;
