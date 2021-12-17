import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import DetailContent from './DetailContent/DetailContent';
import DetailReviews from './DetailReviews/DetailReviews';

function Detail() {
  const params = useParams();
  const { bookId } = params;
  const [book, setBook] = useState(null);
  const [aboutReviews, setAboutReviews] = useState(null);
  const Authorization = sessionStorage.getItem('Authorization');

  const getReviews = useCallback(() => {
    // TODO 백엔드 통신
    // fetch('/data/reviews.json')
    fetch(`${API.review}/${bookId}`)
      .then(res => res.json())
      .then(res => {
        setAboutReviews(res.result);
      })
      .catch(e => {
        console.error(e);
      });
    // TODO 에러처리
    // 성공시 다시 변경하기
    // }, [Authorization, bookId]);
  }, [bookId]);

  useEffect(() => {
    // TODO 백엔드 통신 부분
    // fetch(`/data/book${bookId}.json`)

    fetch(`${API.book}/${bookId}`, {
      headers: {
        ...(Authorization && { Authorization: Authorization }),
      },
    })
      .then(res => res.json())
      .then(res => {
        setBook(res.result);
      })
      .catch(e => {
        console.error(e);
      });

    getReviews();
  }, [Authorization, bookId, getReviews]);

  return (
    <DetailWrapper>
      {!book || !aboutReviews ? (
        <Loading>로딩중...</Loading>
      ) : (
        <>
          <DetailContent
            book={book}
            setBook={setBook}
            aboutReviews={aboutReviews}
          />
          <DetailReviews
            getReviews={getReviews}
            aboutReviews={aboutReviews}
            book={book}
          />
        </>
      )}
    </DetailWrapper>
  );
}

export default Detail;

const DetailWrapper = styled.div`
  max-width: 1040px;
  padding: 0 20px;
  margin: auto;
`;

const Loading = styled.span`
  display: flex;
  justify-content: center;
  line-height: 45vh;
  font-size: 41px;
  color: ${({ theme }) => theme.grey};
`;
