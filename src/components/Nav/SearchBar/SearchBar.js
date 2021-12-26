import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react/cjs/react.production.min';

const SearchBar = ({
  isWideSearchBar,
  shrinkSearchWidth,
  expandSearchWidth,
}) => {
  // const [searchData, setSearchData] = useState([]);

  const fetchData = async () => {
    const data = await fetch(
      'https://dapi.kakao.com/v3/search/book?target=title',
      {
        data: { query: '미움받을 용기' },
        headers: {
          Authorization: 'KakaoAK 9c4c19fe2105df99dfc7a18442c395e4',
        },
      }
    );
    const res = await data.json();
    // setSearchData(res);
    // console.log(res);
  };
  // console.log(searchData);
  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  return (
    <Search isWideSearchBar={isWideSearchBar}>
      <Input
        onFocus={expandSearchWidth}
        onBlur={shrinkSearchWidth}
        placeholder="제목, 저자, 출판사 검색"
      />
      <IconButton>
        <FaSearch />
      </IconButton>
    </Search>
  );
};

export default SearchBar;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${({ isWideSearchBar }) => (isWideSearchBar ? '500px' : '330px')};
  height: 48px;
  padding: 7px;
  background-color: white;
  border-radius: 24px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 38px;
  padding: 10px;
  background-color: ${({ theme }) => theme.pointCobalt};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 100%;
  cursor: pointer;
`;
