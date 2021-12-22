import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { IoCart } from 'react-icons/io5';
import { MdOutlineRateReview, MdStarRate } from 'react-icons/md';
import { API } from '../../../config';

function DetailContent({ book, setBook, aboutReviews, setPdfOpened }) {
  const params = useParams();
  const { bookId } = params;
  const reviewsLength =
    !aboutReviews || !aboutReviews.review ? 0 : aboutReviews.review.length;
  const { purchased, name, authors, price, description, thumbnail } = book;
  const avgRating =
    !aboutReviews || !aboutReviews.average
      ? 0.0
      : aboutReviews.average.avg_rating;

  const token = sessionStorage.getItem('Authorization');

  const buyBook = () => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다');
      return;
    }

    fetch(API.orders, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        cart_id: [bookId],
      }),
    })
      .then(res => {
        if (res.status === 201) {
          alert('주문이 완료되었습니다');
          setBook({ ...book, purchased: true });
          return;
        }

        return res.json();
      })
      .then(res => {
        if (BUY_ERRORS[res.message]) {
          return alert(BUY_ERRORS[res.message]);
        }
      });
  };

  const toCartPage = () => {
    if (!token) {
      alert('로그인이 필요한 서비스입니다');
      return;
    }

    fetch(API.carts, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        book_id: bookId,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (CART_ERRORS[res.message]) {
          return alert(CART_ERRORS[res.message]);
        }
      });
  };

  const openPdf = () => {
    setPdfOpened(true);
  };

  return (
    <DetailContentWrapper>
      <Information>
        <BookImg>
          <Thumbnail src={thumbnail} />
        </BookImg>
        <InformationText>
          <InformationTextTop>
            <Name>{name}</Name>
            <Authors>{authors.join(', ')} 저</Authors>
            {!purchased && (
              <BuyBtns>
                <BuyBtn onClick={buyBook}>
                  구매 {Number(price).toLocaleString()} 원
                </BuyBtn>
                <CartBtn onClick={toCartPage}>
                  <IoCart />
                </CartBtn>
              </BuyBtns>
            )}
          </InformationTextTop>
          <InformationTextBottom>
            {purchased ? (
              <ReadBtn onClick={openPdf}>보기</ReadBtn>
            ) : (
              <PreviewBtn onClick={openPdf}>미리보기</PreviewBtn>
            )}
            <Border />
            <AboutReview>
              <MdOutlineRateReview />
              <ReviewTitle>리뷰</ReviewTitle>
              <ReviewText>{reviewsLength}개</ReviewText>
            </AboutReview>
            <Border />
            <Rate>
              <MdStarRate />
              <RateTitle>평점</RateTitle>
              <RateText>{Number(avgRating).toFixed(2)}</RateText>
            </Rate>
          </InformationTextBottom>
        </InformationText>
      </Information>
      <Description>
        <DescriptionTitle>작품 소개</DescriptionTitle>
        <DescriptionContent>{description}</DescriptionContent>
      </Description>
    </DetailContentWrapper>
  );
}

export default DetailContent;

const DetailContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 60px 0px 30px;
`;

const Information = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  width: 100%;
`;

const BookImg = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 285px;
  border-radius: 10px;
  object-fit: cover;
  box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 32%);
`;

const InformationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 40px;
  width: 100%;
  height: 285px;
  border-radius: 5px;
`;

const InformationTextTop = styled.div``;

const Name = styled.span`
  max-width: 350px;
  overflow: hidden;
  font-size: 25px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Authors = styled.p`
  margin-top: 10px;
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.darkGrey};
`;

const InformationTextBottom = styled.div`
  display: flex;
  background: #faf9fd;
  width: 100%;
  align-items: center;
  padding: 6px 0px;
  border-radius: 10px;
`;

const PreviewBtn = styled.button`
  flex: 1;
  margin: 15px 0;
  width: 200px;
  padding: 8px 0;
  background: transparent;
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.pointCobalt};
  font-weight: 600;
  cursor: pointer;
`;

const ReadBtn = styled(PreviewBtn)``;

const BuyBtns = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 200px;
`;

const BuyBtn = styled.button`
  width: 160px;
  background: ${({ theme }) => theme.pointCobalt};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #4c30b1;
  }
`;

const CartBtn = styled.button`
  display: flex;
  align-items: center;
  height: 35px;
  width: 35px;
  background: ${({ theme }) => theme.grey};
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.darkGrey};
  }
`;

const Border = styled.div`
  border-left: 1px solid ${({ theme }) => theme.lightGrey};
  height: 35px;
`;

const AboutReview = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: ${({ theme }) => theme.grey};
`;

const ReviewTitle = styled.span`
  margin: 4px 0 5px;
  color: ${({ theme }) => theme.grey};
  font-size: 11px;
  font-weight: 500;
`;

const ReviewText = styled.span`
  color: ${({ theme }) => theme.veryDarkGrey};
  font-size: 13px;
  font-weight: 700;
`;

const Rate = styled(AboutReview)`
  border: none;
`;

const RateTitle = styled(ReviewTitle)``;

const RateText = styled(ReviewText)``;

const Description = styled.div`
  width: 100%;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.white};
  border-bottom: 1px solid ${({ theme }) => theme.white};
`;

const DescriptionTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
`;
const DescriptionContent = styled.p`
  padding: 30px 0;
  line-height: 1.3;
`;

const BUY_ERRORS = {
  TransactionManagementError: '에러입니다',
  KEY_ERROR: '에러입니다',
};

const CART_ERRORS = {
  SUCCESS: '장바구니에 추가했습니다.',
  BOOK_NOT_EXIST: '존재하지 않는 책입니다.',
  BOOK_ALREADY_EXIST: '이미 구매한 책입니다.',
};
