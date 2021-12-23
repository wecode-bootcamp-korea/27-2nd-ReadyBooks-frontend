import { API } from '../config';

const { Kakao } = window;

export const kakaoInit = () => {
  Kakao.init(process.env.REACT_APP_JAVASCRIPT_KEY);
};

export const kakaoLogin = (navigate, setLoggedIn) => {
  if (!Kakao.isInitialized()) {
    kakaoInit();
  }

  Kakao.Auth.loginForm({
    success: res => {
      sendAccessTokenToBack(res.access_token, navigate, setLoggedIn);
    },
    fail: e => {
      console.error(e);
    },
  });
};

const sendAccessTokenToBack = (access_token, navigate, setLoggedIn) => {
  fetch(API.login, {
    headers: {
      Authorization: access_token,
    },
  })
    .then(res => res.json())
    .then(res => {
      if (res.Authorization) {
        sessionStorage.setItem('Authorization', res.Authorization);
        sessionStorage.setItem('user_nickname', res.user_nickname);
        sessionStorage.setItem('user_profile_img', res.user_profile_img);
        sessionStorage.setItem('user_id', res.user_id);
        navigate('/');
        setLoggedIn(true);
        return;
      }

      if (!!res.message) {
        switch (res.message) {
          case 'KEY_ERROR':
          case 'VALUE_ERROR':
          case 'DATA_ERROR':
          case 'TRANSACTION_ERROR':
          case 'REQUESTS_CONNECTION_ERROR':
          case 'REQUESTS_TIMEOUT':
          case 'REQUESTS_HTTP_ERROR':
            console.error(res.message);
            alert('에러입니다! 로그인이 되지 않았습니다.');
            break;
          default:
            break;
        }
      }
    });
};

export const breakConnection = () => {
  Kakao.API.request({
    url: '/v1/user/unlink',
    success: function (response) {
      alert('연결을 끊었습니다');
    },
    fail: function (error) {
      console.error(error);
    },
  });
};

export const logingOut = () => {
  if (!Kakao.isInitialized()) {
    kakaoInit();
  }
  Kakao &&
    Kakao.Auth &&
    Kakao.Auth.logout(function () {
      return;
    });
  sessionStorage.clear();
  alert('로그아웃 되었습니다.');
};

export const getUsers = () => {
  Kakao.API.request({
    url: '/v2/user/me',
  }).then(res => {
    return;
  });
};
