import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem.js';
import { API } from '../../config.js';
import styled from 'styled-components';

function Cart() {
  const [productList, setProductList] = useState([]); //mockdata 받아옴

  const checkedProducts = productList.filter(
    product => product.isChecked === true
  );

  const checkedProductListLength = checkedProducts.length;
  const isAllChecked = checkedProductListLength === productList.length;
  const checkedProductListTotalPrice = checkedProducts.reduce(
    (total, product) => {
      total += product.price; //total = total + x
      return total;
    },
    0
  );
  const checkedDeleteProducts = item => {
    setProductList(item => item.filter(item => item.isChecked === false));
  };

  useEffect(() => {
    fetch(`${API.carts}`, {
      method: 'GET',
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
      },
    })
      .then(res => res.json())
      .then(res => {
        const result = res.result.map(item => {
          return {
            ...item,
            isChecked: false,
          };
        });
        setProductList(result);
      });
  }, []);

  //로그인 안됐을 때 해당 페이지에 로그인이 필요한 서비스 alert .
  //로그인 했는데 들어오는게 빈배열 문제

  const handleSelectPart = item => {
    setProductList(
      productList.map(product => {
        if (item.book_id === product.book_id) {
          return { ...product, isChecked: product.isChecked ? false : true };
        } else {
          return product;
        }
      })
    );
  };

  const handleSelectAll = () => {
    setProductList(
      productList.map(item => {
        return { ...item, isChecked: !isAllChecked };
      })
    );
  };

  return (
    <Cartbox>
      <Carts>
        <PossibleBuy>구매 가능 목록 {productList.length}권</PossibleBuy>
        <AllSelect>
          <AllCheckWrap>
            <Allcheck
              checked={isAllChecked}
              type="checkbox"
              onClick={handleSelectAll}
            />

            <AllCheckWrapper>전체선택</AllCheckWrapper>
          </AllCheckWrap>
          <Button onClick={checkedDeleteProducts}>선택 삭제</Button>
        </AllSelect>
        {productList.map(item => {
          return (
            <CartItem
              key={item.book_id}
              id={item.book_id}
              name={item.name}
              title={item.title}
              thumbnail={item.thumbnail}
              item={item}
              alt={item.alt}
              price={item.price.toLocaleString()}
              handleSelectPart={handleSelectPart}
              isChecked={item.isChecked}
              checkedDeleteProducts={checkedDeleteProducts}
            />
          );
        })}
      </Carts>
      <AsideBoxWrap>
        <AsideBox>
          <SelectProductNumber>
            <checkedText>
              {checkedProductListLength}권을 선택하셨습니다.
            </checkedText>
          </SelectProductNumber>
          <TotalPrice>
            <TotalPricetext>
              합계
              <SelectProductPrice>
                {checkedProductListTotalPrice.toLocaleString()}
              </SelectProductPrice>
            </TotalPricetext>
          </TotalPrice>
        </AsideBox>
        <ButtonWrap>
          <SelectBuyButton>선택 구매하기</SelectBuyButton>
        </ButtonWrap>
      </AsideBoxWrap>
    </Cartbox>
  );
}

export default Cart;

const Cartbox = styled.div`
  height: 100%;
  display: flex;
  align-content: center;
  align-items: baseline;
  justify-content: center;
  background: #f2f2f2;
`;

const Carts = styled.div`
  height: 100%;
  border: 1px solid #dbdbdb;
  margin: 50px;
  background: #f2f2f2;
`;

const PossibleBuy = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #643df2;
  font-size: 17px;
  color: white;
`;

const AllSelect = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
`;

const AllCheckWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;

const AllCheckWrapper = styled.div``;

const Allcheck = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
`;
const Button = styled.button`
  width: 80px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: grey;

  &:hover {
    cursor: pointer;
    background: #f2f4f5;
    color: grey;
  }
`;

const AsideBoxWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const AsideBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 180px;
  /* padding: 15px; */
  background: white;
  border: 1px solid #dbdbdb;
`;

const SelectProductNumber = styled.div`
  padding: 15px;
`;

const checkedText = styled.div`
  background: blue;
`;

const checkedBookList = styled.span`
  background-color: blue;
  color: red;
  width: 50px;
`;

const TotalPrice = styled.div`
  color: #0d0d0d;
`;

const TotalPricetext = styled.div`
  background: #643df2;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const SelectProductPrice = styled.div`
  width: 50px;
`;

const ButtonWrap = styled.div`
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SelectBuyButton = styled.button`
  width: 300px;
  height: 40px;
  background: #643df2;
  border: 1px solid #dbdbdb;
  color: white;
  font-size: 16px;
  margin-top: 7%;
  &:hover {
    opacity: 0.9;
  }
`;
