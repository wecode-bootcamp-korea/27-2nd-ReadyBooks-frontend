import React from 'react';
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div>
      <Link to="/login">로그인</Link>
      <button>로그아웃</button>
    </div>
  );
}

export default Main;
