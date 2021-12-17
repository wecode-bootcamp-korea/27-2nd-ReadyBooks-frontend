import React from 'react';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti';

function Review({ review, deleteReview }) {
  const { user, user_id, rating, content, created_at, review_id } = review;
  const currentUserId = sessionStorage.getItem('user_id') || 1;
  const createDate = new Date(created_at);
  const rate = parseInt(rating);

  return (
    <ReviewWrapper
      iswritter={Number(user_id) === Number(currentUserId) ? true : false}
    >
      <ReviewContent>
        <ReviewInformation>
          <Rate>
            {[...Array(5)].map((_, i) => {
              return i < rate ? (
                <AiFillStar key={i} />
              ) : (
                <AiOutlineStar key={i} />
              );
            })}
          </Rate>
          <Writter>{user}</Writter>
          <CreateDate>{createDate.toLocaleDateString()}</CreateDate>
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
    opacity: ${({ iswritter }) => (iswritter ? 1 : 0)};
    cursor: ${({ iswritter }) => (iswritter ? 'pointer' : 'auto')};
  }
`;

const ReviewContent = styled.div`
  display: flex;
`;

const ReviewInformation = styled.div`
  display: flex;
  flex-direction: column;
`;

const Rate = styled.div``;

const Writter = styled.span`
  margin: 5px 0;
  font-weight: 500;
`;

const CreateDate = styled.span``;

const ReviewText = styled.span`
  margin-left: 30px;
`;
