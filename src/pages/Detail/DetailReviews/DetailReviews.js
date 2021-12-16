import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Review from './Review/Review';

function DetailReviews() {
  const [reviews, setReviews] = useState(BASEREVIEWS);
  const [inputRate, setInputRate] = useState(5);
  const [inputTextrea, setInputTextrea] = useState('');
  // TODO : 통신 후 수정 , 로그인 되어야 보여짐
  const nickname = sessionStorage.getItem('user_nickname') || 'maria';
  //  TODO : 백엔드 통신에 이용해야함
  const userId = sessionStorage.getItem('user_id') || 1;
  const nextReviewId = useRef(4);
  const handleAddRateStarInput = i => {
    setInputRate(i + 1);
  };

  const changeTextarea = e => {
    setInputTextrea(e.target.value);
  };

  const addReview = () => {
    if (!inputTextrea.trim().length) {
      return;
    }

    const today = date.toLocaleDateString();

    setReviews([
      ...reviews,
      {
        user: nickname,
        rating: inputRate,
        content: inputTextrea,
        created_at: today,
        user_id: userId,
        review_id: nextReviewId.current,
      },
    ]);

    // TODO 백엔드 소통
    // fetch('백엔드URL', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     user_id: userId,
    //     user: nickname,
    //     review_Id: userId,
    //     content: inputTextrea,
    //   }),
    // });
    nextReviewId.current += 1;
    setInputRate(5);
    setInputTextrea('');
  };

  const EnterInTextAtrea = e => {
    if (e.code === 'Enter') {
      addReview();
      e.preventDefault();
    }
  };

  const deleteReview = reviewId => {
    setReviews(reviews.filter(review => !(review.review_id === reviewId)));

    // 백엔드 통신
    //   fetch('', {
    //     method: 'POST',
    //     headers: {
    //       Authorization: '',
    //     },
    //     body: JSON.stringify({
    //       review_id: reviewId,
    //     }),
    //   });
  };

  return (
    <ReviewsWrapper>
      <RateContainer>
        <RateContainerTitle>평균평점</RateContainerTitle>
        <AverageRate>5.0</AverageRate>
      </RateContainer>
      <ReviewInputWrapper>
        <AddRate>
          {[...Array(5)].map((_, i) => {
            return i < inputRate ? (
              <AiFillStar key={i} onClick={() => handleAddRateStarInput(i)} />
            ) : (
              <AiOutlineStar
                key={i}
                onClick={() => handleAddRateStarInput(i)}
              />
            );
          })}
        </AddRate>
        <ReviewTextArea
          onChange={changeTextarea}
          placeholder="리뷰 작성 시 광고 및 욕설, 비속어나 타인을 비방하는 문구를 사용하시면 비공개 될 수 있습니다."
          value={inputTextrea}
          onKeyPress={EnterInTextAtrea}
        />
        <AddReviewBtn onClick={addReview}>리뷰 추가</AddReviewBtn>
      </ReviewInputWrapper>
      <Reviews>
        {reviews.map((review, i) => (
          <Review
            key={review.review_id}
            review={review}
            deleteReview={deleteReview}
          />
        ))}
      </Reviews>
    </ReviewsWrapper>
  );
}

export default DetailReviews;

const date = new Date();

const ReviewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RateContainerTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const AverageRate = styled.span`
  margin-top: 10px;
  font-size: 30px;
  font-weight: 700;
`;

const ReviewInputWrapper = styled.div`
  margin-bottom: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  background: ${({ theme }) => theme.white};
  border-radius: 5px;
`;

const AddRate = styled.div`
  margin-bottom: 10px;

  svg {
    font-size: 30px;
    color: ${({ theme }) => theme.grey};
    cursor: pointer;
  }
`;

const ReviewTextArea = styled.textarea`
  padding: 10px;
  width: 400px;
  height: 100px;
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
`;

const Reviews = styled.ul`
  width: 900px;
  margin: 20px 0;
  padding: 0px 20px;
`;
const BASEREVIEWS = [
  {
    review_id: 1,
    user_id: 1,
    user: '\bnickname1',
    rating: '5.00',
    content: 'content',
    created_at: '2021-12-15T11:54:13.060Z',
  },
  {
    review_id: 2,
    user_id: 2,
    user: '\bnickname2',
    rating: '4.00',
    content: 'content',
    created_at: '2021-12-15T11:54:13.062Z',
  },
  {
    review_id: 3,
    user_id: 3,
    user: '\bnickname2',
    rating: '3.00',
    content: 'content',
    created_at: '2021-12-15T11:54:13.062Z',
  },
];
