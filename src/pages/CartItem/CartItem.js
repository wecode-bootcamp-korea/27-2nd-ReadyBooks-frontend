import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function CartItem({ handleSelectPart, item, deleteSelectHandler }) {
  const { cart_id, title, name, thumbnail, isChecked, price, book_id } = item;
  return (
    <Detail>
      <PartCheckbox
        type="checkbox"
        checked={isChecked}
        onChange={() => handleSelectPart(item)}
      />
      <Link to={`/detail/${book_id}`}>
        <BookImg className="img" src={thumbnail} />
      </Link>
      <Bookinfo>
        <BookTitle>{title}</BookTitle>
        <AuthorName>{name}</AuthorName>
        <DeleteButton onClick={() => deleteSelectHandler(cart_id)}>
          삭제
        </DeleteButton>
      </Bookinfo>
      <Price>{Number(price).toLocaleString()}원</Price>
    </Detail>
  );
}

export default CartItem;

const Detail = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 15px;
  border-top: 1px solid #dbdbdb;
`;

const PartCheckbox = styled.input`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
`;

const BookImg = styled.img`
  object-fit: cover;
  width: 80px;
  height: 100px;
  margin: 0 15px;
  border-radius: 5px;
`;

const Bookinfo = styled.div`
  display: flex;
  width: 400px;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  background: white;
`;

const BookTitle = styled.h2`
  font-weight: bold;
  font-size: 17px;
`;

const AuthorName = styled.p`
  font-size: 13px;
`;

const DeleteButton = styled.button`
  width: 60px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #dbdbdb;
  color: grey;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background: #f2f4f5;
    color: grey;
  }
`;

const Price = styled.div`
  color: #5d3bd9;
  font-weight: bold;
  margin-right: 10px;
  text-align: right;
  width: 120px;
`;
