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
    fetch(`${API.review}?book_id=${bookId}`)
      .then(res => res.json())
      .then(res => {
        if (!!res.result) {
          setAboutReviews(res.result[0]);
          return;
        }

        switch (res.message) {
          case 'DOES_NOT_EXIST':
            alert('에러입니다');
            break;
          default:
            break;
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [bookId]);

  useEffect(() => {
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
