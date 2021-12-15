import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Nav = () => {
  const [isWideSearchBar, setIsWideSearchBar] = useState(false);

  const onClickSearch = () => {
    setIsWideSearchBar(prev => !prev);
  };

  return (
    <Background>
      <Wrapper>
        <Link to="/">
          <Logo>ReadyBooks</Logo>
        </Link>
        <Search onClick={onClickSearch} isWideSearchBar={isWideSearchBar}>
          <Input placeholder="제목, 저자, 출판사 검색" />
          <IconButton>
            <FaSearch />
          </IconButton>
        </Search>
        <Button>
          <img src="images/kakao_login_small.png" alt="login" />
        </Button>
      </Wrapper>
    </Background>
  );
};

const Background = styled.header`
  width: 100%;
  height: 120px;
  padding: 20px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  border-bottom: 1px solid ${({ theme }) => theme.veryLightGrey};
`;

const Wrapper = styled.div`
  width: 1040px;
  height: 120px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
`;

const Logo = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.black};
  cursor: pointer;
`;

const Search = styled.button`
  width: ${({ isWideSearchBar }) => (isWideSearchBar ? '500px' : '330px')};
  height: 48px;
  background-color: white;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: none;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
`;

const Input = styled.input`
  width: 300px;
  height: 24px;
  padding-left: 20px;
`;

const IconButton = styled.button`
  width: 40px;
  height: 38px;
  border-radius: 100%;
  padding: 10px;
  color: #f2f2f2;
  background-color: ${({ theme }) => theme.pointCobalt};
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: inherit;
`;

export default Nav;
