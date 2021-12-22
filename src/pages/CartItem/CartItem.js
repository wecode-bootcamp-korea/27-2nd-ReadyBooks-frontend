import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

function CartItem({
  name,
  title,
  thumbnail,
  price,
  isChecked,
  handleSelectPart,
  item,
  checkedDeleteProducts,
  id,
}) {
  return (
    <Detail>
      <PartCheckbox
        type="checkbox"
        checked={isChecked}
        onClick={() => handleSelectPart(item)}
      />
      <Link to={`/detail/${id}`}>
        <BookImg className="img" src={thumbnail} />
      </Link>
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
  width: 100%;
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

const BookImg = styled.img`
  width: 80px;
  height: 100px;
  margin: 0 15px;
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
  width: 80px;
`;
