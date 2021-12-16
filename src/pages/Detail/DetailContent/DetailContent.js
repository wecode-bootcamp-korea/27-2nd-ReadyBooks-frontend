import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCart } from 'react-icons/io5';

function DetailContent() {
  const [content, setContent] = useState(MOCKCONTENT);
  const { purchased, name, authors, price, description } = content;
  const Authorizaition = sessionStorage.getItem('Authorizaition') || '';

  const buyBook = () => {
    if (!Authorizaition) {
      alert('로그인이 필요한 서비스입니다');
      return;
    }

    //  TODO 백엔드 통신
    // useEffect(() => {
    //   fetch('', headers: {
    // Authorizaition: Authorizaition
    // })
    //     .then(res => res.json())
    //     .then(res => {
    //       // purchased 설정
    //       // content 설정
    //     });
    // }, []);

    alert('구매되었습니다!');
    setContent({ ...content, purchased: true });
  };

  const toCartPage = () => {
    if (!Authorizaition) {
      alert('로그인이 필요한 서비스입니다');
      return;
    }
    // TODO 백엔드 통신 장바구니 추가하기
  };

  return (
    <DetailContentWrapper>
      <Information>
        <Thumnail src="/images/littlePrince.jpeg" />
        {purchased ? (
          <ReadBtn>보기</ReadBtn>
        ) : (
          <PreviewBtn>미리보기</PreviewBtn>
        )}
        <InformationText>
          <Name>{name}</Name>
          <Authors>
            {authors.join(', ')} <AuthorUnit>저</AuthorUnit>
          </Authors>
          <Price>판매가 : {Number(price).toLocaleString()} 원</Price>
        </InformationText>
      </Information>
      {!purchased && (
        <BuyBtns>
          <BuyBtn onClick={buyBook}>구매하기</BuyBtn>
          <CartBtn onClick={toCartPage}>
            <IoCart />
          </CartBtn>
        </BuyBtns>
      )}
      <Description>
        <DescriptionTitle>작품 소개</DescriptionTitle>
        <DescriptionContent>{description}</DescriptionContent>
      </Description>
    </DetailContentWrapper>
  );
}

export default DetailContent;

const DetailContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0px 30px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Thumnail = styled.img`
  width: 200px;
  height: 285px;
  object-fit: cover;
`;

const InformationText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.span`
  max-width: 350px;
  overflow: hidden;
  font-size: 26px;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Authors = styled.p`
  margin-top: 10px;
  font-weight: 500;
  font-size: 15px;
`;

const AuthorUnit = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: ${({ theme }) => theme.darkGrey};
`;

const Price = styled.span`
  margin-top: 10px;
  font-weight: 400;
  font-size: 15px;
`;

const PreviewBtn = styled.button`
  margin: 15px 0;
  width: 200px;
  padding: 8px 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.pointCobalt};
  border-radius: 5px;
  color: ${({ theme }) => theme.pointCobalt};
  font-weight: 500;
  cursor: pointer;
`;

const ReadBtn = styled(PreviewBtn)`
  background: ${({ theme }) => theme.pointCobalt};
  border: none;
  color: ${({ theme }) => theme.white};

  &:hover {
    background: ${({ theme }) => theme.pointDarkCobalt};
  }
`;

const BuyBtns = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
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
    background: ${({ theme }) => theme.pointDarkCobalt};
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

const Description = styled.div`
  width: 100%;
  padding-top: 30px;
  border-top: 1px solid ${({ theme }) => theme.veryLightGrey};
  border-bottom: 1px solid ${({ theme }) => theme.veryLightGrey};
`;

const DescriptionTitle = styled.span`
  font-weight: 500;
  font-size: 20px;
`;
const DescriptionContent = styled.p`
  padding: 30px 0;
  line-height: 1.3;
`;

const MOCKCONTENT = {
  purchased: false,
  name: '책1',
  price: '9000.00',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt totam minus expedita sequi, aspernatur quasi recusandae .',
  thumbnail: 'thumbnail',
  authors: ['author1', 'author2'],
  average: {
    rating__avg: '5.000000',
  },
  reviews: [
    {
      user: '\bnickname1',
      rating: '5.00',
      content: 'content',
      created_at: '2021-12-15T11:54:13.060Z',
    },
    {
      user: '\bnickname2',
      rating: '4.00',
      content: 'content',
      created_at: '2021-12-15T11:54:13.062Z',
    },
    {
      user: '\bnickname3',
      rating: '3.00',
      content: 'content',
      created_at: '2021-12-15T11:54:13.062Z',
    },
  ],
};
