import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Nav/SearchBar/SearchBar';
import styled from 'styled-components';
import { BsFillCartFill } from 'react-icons/bs';
import { kakaoLogin, logingOut } from '../../api/KakaoApi';

const Nav = () => {
  const navigate = useNavigate();
  const [isWideSearchBar, setIsWideSearchBar] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!sessionStorage.getItem('Authorization')
  );
  const [profileOpened, setProfileOpened] = useState(false);
  const profile = useRef();

  const nickname = sessionStorage.getItem('user_nickname') || '';
  const profileImg = sessionStorage.getItem('user_profile_img') || '';

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = e => {
    if (profile && profile.current && !profile.current.contains(e.target)) {
      setProfileOpened(false);
    }
  };

  const shrinkSearchWidth = () => {
    setIsWideSearchBar(false);
  };

  const expandSearchWidth = () => {
    setIsWideSearchBar(true);
  };

  const login = () => {
    kakaoLogin(navigate, setLoggedIn);
  };

  const logout = () => {
    logingOut();
    setLoggedIn(false);
    setProfileOpened(false);
  };

  const openProfile = () => {
    setProfileOpened(true);
  };
  return (
    <Background>
      <Wrapper>
        <Link to="/">
          <Logo>ReadyBooks</Logo>
        </Link>
        <SearchBar
          isWideSearchBar={isWideSearchBar}
          shrinkSearchWidth={shrinkSearchWidth}
          expandSearchWidth={expandSearchWidth}
        />
        {loggedIn ? (
          <NavRightBtn>
            <ProfileBtn onClick={openProfile} ref={profile}>
              <img src={profileImg} alt="login" />
              {profileOpened && (
                <Downdown>
                  <DropdopwnText>{nickname} 님</DropdopwnText>
                  <Border />
                  <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
                </Downdown>
              )}
            </ProfileBtn>
            <CartIcon>
              <Link to="/cart">
                <BsFillCartFill />
              </Link>
            </CartIcon>
          </NavRightBtn>
        ) : (
          <LoginBtn onClick={login}>
            <img src="/images/kakao_login_medium.png" alt="login" />
          </LoginBtn>
        )}
      </Wrapper>
    </Background>
  );
};

export default Nav;

const Background = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  padding: 20px;
  position: fixed;
  z-index: 99;
  border-bottom: 1px solid ${({ theme }) => theme.veryLightGrey};
  background: white;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 120px;
  width: 1040px;
  z-index: 99;
`;

const Logo = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.black};
  cursor: pointer;
`;

const NavRightBtn = styled.div`
  display: flex;
`;

const LoginBtn = styled.button`
  background: none;
  padding: none;
  border: none;
  cursor: pointer;
`;

const ProfileBtn = styled.button`
  position: relative;
  padding: 0px;
  background: none;
  border: none;
  cursor: pointer;

  & > img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Downdown = styled.div`
  position: absolute;
  left: -58px;
  bottom: -100px;
  width: 150px;
  background: #fff;
  border: 1px solid ${({ theme }) => theme.veryLightGrey};
  border-radius: 5px;
`;

const DropdopwnText = styled.div`
  color: ${({ theme }) => theme.black};
  line-height: 45px;
  font-weight: 500;
  cursor: default;
`;

const LogoutBtn = styled(DropdopwnText)`
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const Border = styled.div`
  margin: 0 10px;
  border-top: 1px solid ${({ theme }) => theme.veryLightGrey};
`;

const CartIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 17px;
  font-size: 30px;

  svg {
    color: ${({ theme }) => theme.black};
  }
`;
