import React, { useState } from 'react';
import { FaAccessibleIcon } from 'react-icons/fa';
import styled from 'styled-components';

function CartItem({
  key,
  id,
  name,
  title,
  thumbnail,
  alt,
  price,
  handleClick,
  isChecked,
  handleSelectPart,
  item,
  checkedDeleteProducts,
}) {
  return (
    <Detail>
      <PartCheckbox
        type="checkbox"
        checked={isChecked}
        onClick={() => handleSelectPart(item)}
      />
      <Bookcheckbox>
        <div className="img">{thumbnail}</div>
      </Bookcheckbox>
      <Bookinfo>
        <BookTitle>{title}</BookTitle>
        <AuthorName>{name}</AuthorName>
        <DeleteButton onClick={checkedDeleteProducts}>삭제</DeleteButton>
      </Bookinfo>
      <Price>{price}</Price>
    </Detail>
  );
}

export default CartItem;

const Detail = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 610px;
  height: 150px;
  padding: 15px;
  item-style: none;
  background: white;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
`;

const PartCheckbox = styled.input`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #bcbcbc;
  cursor: pointer;
`;
const Bookcheckbox = styled.div`
  color: #0d0d0d;
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

const Price = styled.h2`
  color: #5d3bd9;
  font-weight: bold;
`;
