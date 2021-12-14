import React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const REST_API_KEY = '41a42b07d20ba6ef41277371b9f0e93b';
const REDIRECT_URI = 'http://localhost:3000/login';
const URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`;

function Login() {
  const navigate = useNavigate();
  const [search, setSearch] = useSearchParams();
  const AUTHORIZE_CODE = search.get('code');

  if (!!AUTHORIZE_CODE) {
    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: AUTHORIZE_CODE,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }
  console.log('AUTHORIZE_CODE', AUTHORIZE_CODE);
  return (
    <div>
      <a href={URL}>카카오 로그인</a>
      <Link to="/">홈</Link>
    </div>
  );
}

export default Login;
