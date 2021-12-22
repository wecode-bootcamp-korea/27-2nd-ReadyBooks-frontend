import React, { useState } from 'react';
import styled from 'styled-components';
import Reviews from './Reviews/Reviews';
import { useParams } from 'react-router-dom';
import { IoBook, IoBookOutline } from 'react-icons/io5';
import { API } from '../../../config.js';

function DetailReviews({ aboutReviews, getReviews, book }) {
  const params = useParams();
  const { bookId } = params;
  const { purchased } = book;
  const { review } = aboutReviews;
  const [inputRate, setInputRate] = useState(5);
  const [inputTextarea, setInputTextarea] = useState('');
  const Authorization = sessionStorage.getItem('Authorization');
  const nickname = sessionStorage.getItem('user_nickname');

  const handleAddRateStarInput = i => {
    setInputRate(i + 1);
  };

  const changeTextarea = e => {
    setInputTextarea(e.target.value);
  };

  const addReview = () => {
    if (!Authorization) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!inputTextarea.trim().length) {
      return;
    }

    fetch(`${API.review}`, {
      headers: {
        Authorization: Authorization,
      },
      method: 'POST',
      body: JSON.stringify({
        nickname: nickname,
        content: inputTextarea,
        rating: inputRate,
        book_id: bookId,
      }),
    })
      .then(res => res.json())
      .then(res => {
        switch (res.message) {
          case 'SUCCESSS':
            getReviews();
            break;
          case 'INVALID_USER':
          case 'INVALID_TOKEN':
            alert('로그인이 필요한 서비스입니다.');
            break;
          case 'KEY_ERROR':
            alert('에러입니다');
            break;
          default:
            break;
        }
      })
      .catch(e => {
        console.error(e);
      });

    setInputRate(5);
    setInputTextarea('');
  };

  const deleteReview = reviewId => {
    if (!Authorization) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    fetch(`${API.review}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: Authorization,
      },
    })
      .then(res => {
        if (res.statusText === 'No Content') {
          getReviews();
          return;
        }

        if (res.status === 400) {
          alert('에러입니다.');
          return;
        }
      })
      .catch(e => {
        console.error(e);
      });
  };

  const EnterInTextArea = e => {
    if (e.code === 'Enter') {
      addReview();
      e.preventDefault();
    }
  };

  return (
    <ReviewsWrapper>
      {!!Object.keys(aboutReviews).length && (
        <>
          <ReviewInputWrapper>
            <AddRate>
              {[...Array(5)].map((_, i) => {
                return i < inputRate ? (
                  <IoBook key={i} onClick={() => handleAddRateStarInput(i)} />
                ) : (
                  <IoBookOutline
                    key={i}
                    onClick={() => handleAddRateStarInput(i)}
                  />
                );
              })}
            </AddRate>
            <ReviewTextArea
              onChange={changeTextarea}
              placeholder={
                !purchased || !Authorization
                  ? '책 구매 후 리뷰를 남겨주세요 :)'
                  : '다양한 생각을 남겨주세요 :)'
              }
              value={inputTextarea}
              onKeyPress={EnterInTextArea}
              disabled={!purchased || !Authorization ? true : false}
            />
            <AddReviewBtn
              disabled={!inputTextarea.trim().length}
              isDisabled={!inputTextarea.trim().length}
              onClick={addReview}
            >
              리뷰 추가
            </AddReviewBtn>
          </ReviewInputWrapper>
          <Reviews reviews={review} deleteReview={deleteReview} />
        </>
      )}
    </ReviewsWrapper>
  );
}

export default DetailReviews;

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px 0 100px 0;
`;

const ReviewInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 10px;
  padding: 20px;
  border-radius: 5px;
`;

const AddRate = styled.div`
  margin-bottom: 10px;

  svg {
    margin: 0 5px;
    font-size: 30px;
    color: ${({ theme }) => theme.grey};
    cursor: pointer;
  }
`;

const ReviewTextArea = styled.textarea`
  padding: 15px;
  width: 400px;
  height: 100px;
  background: #faf9fd;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }
`;

const AddReviewBtn = styled.button`
  margin-top: 20px;
  width: 160px;
  height: 35px;
  background: ${({ theme }) => theme.pointCobalt};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${({ isDisabled }) => (isDisabled ? '0.5' : '1')};
`;
