import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { IoBook, IoBookOutline } from 'react-icons/io5';
import { API } from '../../../config.js';
import Reviews from './Reviews/Reviews';

function DetailReviews({ aboutReviews, getReviews, book }) {
  const params = useParams();
  const { bookId } = params;
  const { purchased } = book;
  const { review } = aboutReviews;
  const [inputRate, setInputRate] = useState(5);
  const [inputTextarea, setInputTextarea] = useState('');
  const token = sessionStorage.getItem('Authorization');
  const nickname = sessionStorage.getItem('user_nickname');

  const handleAddRateStarInput = i => {
    setInputRate(i + 1);
  };

  const changeTextarea = e => {
    setInputTextarea(e.target.value);
  };

  const addReview = () => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!inputTextarea.trim().length) {
      return;
    }

    fetch(`${API.review}`, {
      headers: {
        Authorization: token,
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
        if (res.message === '') {
          getReviews();
          return;
        }
        if (ADD_REVIEW_ERROR[res.message]) {
          return alert(ADD_REVIEW_ERROR[res.message]);
        }
      })
      .catch(e => {
        console.error(e);
      });

    setInputRate(5);
    setInputTextarea('');
  };

  const deleteReview = reviewId => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }

    fetch(`${API.review}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
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
                !purchased || !token
                  ? '책 구매 후 리뷰를 남겨주세요 :)'
                  : '다양한 생각을 남겨주세요 :)'
              }
              value={inputTextarea}
              onKeyPress={EnterInTextArea}
              disabled={!purchased || !token ? true : false}
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

const ADD_REVIEW_ERROR = {
  INVALID_USER: '로그인이 필요한 서비스입니다.',
  INVALID_TOKEN: '로그인이 필요한 서비스입니다.',
  KEY_ERROR: 'KEY_ERROR',
};
