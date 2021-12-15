import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Detail from './pages/Detail/Detail';
import Cart from './pages/Cart/Cart';
import styled from 'styled-components';

function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Body>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/detail/:bookId" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Body>
      <Footer />
    </BrowserRouter>
  );
}

const Body = styled.div`
  position: relative;
  top: 120px;
`;

export default Router;
