import React from 'react';
import BestSellerItem from './BestItem/BestItem';
import styled from 'styled-components';

const BestItems = ({ bestSellerList, listIndex }) => {
  return (
    <BestSellerList>
      {bestSellerList.map((el, idx) => (
        <BestSellerItem
          el={el}
          key={idx}
          id={el.id}
          activeSlide={idx === listIndex}
        />
      ))}
    </BestSellerList>
  );
};

export default BestItems;

const BestSellerList = styled.ul`
  display: flex;
`;
