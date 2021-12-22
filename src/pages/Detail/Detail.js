import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import Pdf from '../../components/Pdf/Pdf';
import DetailReviews from './DetailReviews/DetailReviews';
import DetailContent from './DetailContent/DetailContent';

function Detail() {
  const params = useParams();
  const { bookId } = params;
  const [book, setBook] = useState(null);
  const [aboutReviews, setAboutReviews] = useState(null);
  const token = sessionStorage.getItem('Authorization');
  const [pdfOpened, setPdfOpened] = useState(false);

  const getReviews = useCallback(() => {
    fetch(`${API.review}?book_id=${bookId}`)
      .then(res => res.json())
      .then(res => {
        if (!!res.result) {
          setAboutReviews(res.result[0]);
          return;
        }
        if (res.message === 'DOES_NOT_EXIST') {
          return alert('DOES_NOT_EXIST');
        }
      })
      .catch(e => {
        console.error(e);
      });
  }, [bookId]);

  useEffect(() => {
    fetch(`${API.book}/${bookId}`, {
      headers: {
        ...(token && { Authorization: token }),
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
  }, [token, bookId, getReviews]);

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
            setPdfOpened={setPdfOpened}
          />
          <DetailReviews
            getReviews={getReviews}
            aboutReviews={aboutReviews}
            book={book}
          />
        </>
      )}
      {pdfOpened && (
        <PdfWrapper>
          {book && (
            <Pdf
              purchased={book.purchased}
              setPdfOpened={setPdfOpened}
              file={book.file}
            />
          )}
        </PdfWrapper>
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

const PdfWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10000;
  height: 100vh;
  width: 100vw;
  background: #fff;
`;
