import React from 'react';
import styled from 'styled-components';
import { TiDelete } from 'react-icons/ti';

function Review({ review, deleteReview }) {
  const { nickname, user_id, content, created_at, review_id } = review;
  const currentUserId = sessionStorage.getItem('user_id');
  const createDate = new Date(created_at);

  return (
    <ReviewWrapper
      isWriter={Number(user_id) === Number(currentUserId) ? true : false}
    >
      <ReviewContent>
        <ReviewInformation>
          <Writer>{nickname}</Writer>
          <ReviewDate>
            {createDate.toLocaleDateString().slice(0, -1)}
          </ReviewDate>
        </ReviewInformation>
        <ReviewText>{content}</ReviewText>
      </ReviewContent>
      <DeleteBtn onClick={() => deleteReview(review_id)}>
        <TiDelete />
      </DeleteBtn>
    </ReviewWrapper>
  );
}

export default Review;

const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  font-size: 20px;
  opacity: 0;
`;

const ReviewWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.white};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.white};
  }

  &:hover ${DeleteBtn} {
    opacity: ${({ isWriter }) => (isWriter ? 1 : 0)};
    cursor: ${({ isWriter }) => (isWriter ? 'pointer' : 'auto')};
  }
`;

const ReviewContent = styled.div`
  display: flex;
`;

const ReviewInformation = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const Writer = styled.span`
  margin-bottom: 5px;
  font-weight: 500;
  color: ${({ theme }) => theme.darkGrey};
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.grey};
`;

const ReviewText = styled.span`
  margin-left: 30px;
  color: ${({ theme }) => theme.veryDarkGrey};
`;
