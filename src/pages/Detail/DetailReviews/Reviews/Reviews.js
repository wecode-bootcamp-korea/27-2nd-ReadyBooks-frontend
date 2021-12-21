import React from 'react';
import styled from 'styled-components';
import Review from '../Review/Review';

function Reviews({ reviews, deleteReview }) {
  return (
    <ReviewsWrapper>
      {!reviews || !reviews.length ? (
        <ReviewWrapper>첫번째 리뷰어가 되어주세요 :)</ReviewWrapper>
      ) : (
        reviews.map(review => (
          <Review
            key={review.review_id}
            review={review}
            deleteReview={deleteReview}
          />
        ))
      )}
    </ReviewsWrapper>
  );
}

export default Reviews;

const ReviewsWrapper = styled.ul`
  width: 100%;
  padding: 20px 20px 40px;
`;

const ReviewWrapper = styled.div`
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.white};
  text-align: center;
`;
