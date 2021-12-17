import React, { useState } from 'react';
import styled from 'styled-components';
import { IoBook, IoBookOutline } from 'react-icons/io5';
import { API } from '../../../config.js';
import Reviews from './Reviews/Reviews';
import { useParams } from 'react-router-dom';

function DetailReviews({ aboutReviews, getReviews, book }) {
  const { purchased } = book;
  const { review } = aboutReviews;
  const [inputRate, setInputRate] = useState(5);
  const [inputTextarea, setInputTextarea] = useState('');
  const Authorization = sessionStorage.getItem('Authorization');
  const params = useParams();
  const { bookId } = params;
  const nickname = sessionStorage.getItem('user_nickname');
  // const userId = sessionStorage.getItem('user_id');

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

    // nextReviewId.current, 부분
    // TODO 에러처리
    // TODO 백엔드 소통
    fetch(`${API.review}/${bookId}`, {
      headers: {
        ...(Authorization && { Authorization: Authorization }),
      },
      method: 'POST',
      body: JSON.stringify({
        nickname: nickname,
        content: inputTextarea,
        raiting: inputRate,
      }),
    })
      .then(res => res.json())
      .then(res => {
        getReviews();
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
    // TODO 에러처리
    // 백엔드 통신

    fetch(`${API.review}/${reviewId}`, {
      method: 'DELETE',
      headers: {
        ...(Authorization && { Authorization: Authorization }),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'NO CONTENT') {
          getReviews();
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
                  ? '로그인이 필요한 서비스입니다 :)'
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
