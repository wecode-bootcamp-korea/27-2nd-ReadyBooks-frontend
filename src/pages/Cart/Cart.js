import React, { useState, useEffect } from 'react';
import CartItem from '../CartItem/CartItem.js';
import { API } from '../../config.js';
import styled from 'styled-components';

function Cart() {
  const [productList, setProductList] = useState([]);

  const checkedProducts = productList.filter(product => product.isChecked);
  const checkedProductListLength = checkedProducts.length;
  const isAllChecked = checkedProductListLength === productList.length;
  const checkedProductListTotalPrice = checkedProducts.reduce(
    (total, product) => {
      total += Number(product.price);
      return total;
    },
    0
  );

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

  const orderHandler = () => {
    if (productList.filter(item => item.isChecked === true).length === 0) {
      alert('상품을 선택 해주세요.');
      return;
    }
    fetch(API.orders, {
      method: 'POST',
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({
        cart_id: productList
          .filter(item => item.isChecked === true)
          .map(item => item.book_id),
      }),
    }).then(res => {
      res.status === 201 &&
        setProductList(item => item.filter(item => item.isChecked === false));
      alert('상품 주문이 완료 됐습니다.');
    });
  };

  const deleteAllHandler = () => {
    const cartIdQuary = productList
      .filter(item => item.isChecked === true)
      .map(item => item.cart_id)
      .join('&cart_id=');

    fetch(`${API.carts}?cart_id=${cartIdQuary}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
      },
    }).then(res => {
      res.status === 204 &&
        setProductList(item => item.filter(item => item.isChecked === false));
      alert('해당 제품이 삭제 되었습니다.');
    });
  };

  const deleteSelectHandler = cart_id => {
    fetch(`${API.carts}?cart_id=${cart_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: sessionStorage.getItem('Authorization'),
      },
    }).then(res => {
      res.status === 204 &&
        setProductList(item => item.filter(item => item.cart_id !== cart_id));
      alert('해당 제품이 삭제 되었습니다.');
    });
  };

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
              onChange={handleSelectAll}
            />

            <AllCheckWrapper>전체선택</AllCheckWrapper>
          </AllCheckWrap>
          <Button onClick={deleteAllHandler}>선택 삭제</Button>
        </AllSelect>
        {productList.map(item => {
          return (
            <CartItem
              key={item.cart_id}
              item={item}
              handleSelectPart={handleSelectPart}
              deleteSelectHandler={deleteSelectHandler}
            />
          );
        })}
      </Carts>
      <AsideBoxWrap>
        <AsideBox>
          <SelectProductNumber>
            {checkedProductListLength}권을 선택하셨습니다.
          </SelectProductNumber>
          <TotalPrice>
            <TotalPricetext>
              합계
              <SelectProductPrice>
                {checkedProductListTotalPrice.toLocaleString()}원
              </SelectProductPrice>
            </TotalPricetext>
          </TotalPrice>
        </AsideBox>
        <ButtonWrap>
          <SelectBuyButton onClick={orderHandler}>
            선택 구매하기
          </SelectBuyButton>
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
  border-radius: 5px;
  margin: 50px;
  background: #fff;
  width: 630px;
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
  border-radius: 5px 5px 0px 0px;
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
  background: white;
  border-radius: 5px;
`;

const SelectProductNumber = styled.div`
  padding: 15px;
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
  border-radius: 0px 0px 5px 5px;
`;

const SelectProductPrice = styled.div`
  width: 120px;
  text-align: right;
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
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 16px;
  margin-top: 7%;

  &:hover {
    opacity: 0.9;
  }
`;
