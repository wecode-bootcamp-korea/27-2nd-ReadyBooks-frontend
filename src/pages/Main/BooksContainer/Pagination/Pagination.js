import React, { useEffect } from 'react';
import styled from 'styled-components';

const Pagination = ({ fetchData, lastPage, currentPage, setCurrentPage }) => {
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const onPage = el => {
    setCurrentPage(el);
  };
  return (
    <PageUl>
      {[...Array(lastPage)].map((el, idx) => (
        <PageLi key={idx}>
          <PageSpan
            onClick={() => onPage(idx + 1)}
            checkPage={currentPage === idx + 1}
          >
            {idx + 1}
          </PageSpan>
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
  margin: 0 15px;
`;

const PageSpan = styled.span`
  font-size: 18px;
  color: ${({ theme, checkPage }) =>
    checkPage ? theme.pointCobalt : theme.grey};
  font-weight: ${({ checkPage }) => (checkPage ? `bold` : `normal`)};
  border: 0;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.pointCobalt};
    font-weight: bold;
  }
`;
