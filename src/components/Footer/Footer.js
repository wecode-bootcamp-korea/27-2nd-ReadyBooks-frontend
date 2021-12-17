import React from 'react';
import styled from 'styled-components';
import {
  FaFacebookSquare,
  FaGithub,
  FaInstagram,
  FaYoutube,
  FaPlaystation,
} from 'react-icons/fa';

function Footer() {
  return (
    <Footerwrap>
      <Background>
        <Readybooks>(주) ReadyBooks</Readybooks>
        <IconWrap>
          <FaFacebookSquare size={25} />
          <FaGithub size={25} />
          <FaInstagram size={25} />
          <FaYoutube size={25} />
          <FaPlaystation size={25} />
        </IconWrap>
      </Background>
      <UseInfoText>
        <Textwrap>
          <Text>이용약관</Text>
          <Text>개인정보처리방침</Text>
          <Text>청소년보호정책</Text>
          <Text>고객센터</Text>
          <Text>콘텐츠 제휴문의</Text>
          <Text>뷰어 다운로드</Text>
        </Textwrap>
        <UseInfo>
          <span>Copyright © 2021 ReadyBooks All Rights Reserved.</span>
        </UseInfo>
      </UseInfoText>
    </Footerwrap>
  );
}

export default Footer;

const Footerwrap = styled.div`
  width: 100%;
  height: 230px;
  background: #643df2;
  color: #0d0d0d;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 30px;
`;
const Background = styled.div`
  width: 100%;
  color: black;
  display: flex;
  justify-content: space-between;
`;

const Readybooks = styled.span`
  background: transparent;
  height: 50px;
  color: #f2f2f2;
`;

const IconWrap = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  color: #f2f2f2;
`;

const UseInfo = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  background: transparent;
  flex-wrap: wrap;
  color: white;
`;

const UseInfoText = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  width: 550px;
  font-weight: 13px;
  justify-content: space-between;
`;

const Textwrap = styled.div`
  display: flex;
  color: red;
  width: 100%;
  justify-content: space-between;
`;

const Text = styled.p`
  color: black;
  font-size: 12px;
  font-weight: 300;
  margin-bottom: 3%;
  color: white;
`;
