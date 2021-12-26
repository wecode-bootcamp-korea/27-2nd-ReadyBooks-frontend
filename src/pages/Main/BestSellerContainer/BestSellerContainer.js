import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { API } from '../../../config';
import styled from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BestSellerItem from './BestItem/BestItem';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BestSellerContainer = () => {
  const [bestSellerList, setBestSellerList] = useState([]);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const ranking = 10;

  const NextArrow = ({ onClick }) => {
    return (
      <Button onClick={onClick}>
        <FaArrowRight />
      </Button>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <Button onClick={onClick} prev>
        <FaArrowLeft />
      </Button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // TODO 백엔드 통신 베스트셀러 내용 받기
  const fetchData = async () => {
    const data = await fetch(
      `${API.books}?limit=${ranking}&offset=0&ordering=-review_avg`
    );
    const res = await data.json();
    setBestSellerList(res.result); // res.~~ 로 받아오기
  };

  useEffect(() => {
    (async () => {
      setIsBooksLoading(true);
      await fetchData();
      setIsBooksLoading(false);
    })();
  }, []);

  return (
    !isBooksLoading && (
      <Slider {...settings}>
        {bestSellerList &&
          bestSellerList.map((el, idx) => (
            <BestSellerItem el={el} key={idx} idx={idx} />
          ))}
      </Slider>
    )
  );
};

export default BestSellerContainer;

const Button = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 40%;
  ${props => (props.prev ? 'left:-60px;' : 'right:-60px;')}
  cursor: pointer;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
`;
