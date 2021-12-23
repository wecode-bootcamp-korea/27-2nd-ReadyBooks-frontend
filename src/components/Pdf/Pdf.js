import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import styled from 'styled-components';
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';

export default function Pdf({ purchased, setPdfOpened, file }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY * -1 || '0', 10) * -1);
    };
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const closePdf = () => {
    setPdfOpened(false);
  };

  const gotoBeforePage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      alert('첫 페이지 입니다!');
    }
  };

  const goToNextPage = () => {
    if (pageNumber < (purchased ? numPages : 10)) {
      setPageNumber(pageNumber + 1);
      return;
    }

    if (purchased) {
      alert('마지막 페이지입니다.');
    } else {
      alert('책 구매 후 이후 내용을 보실 수 있습니다 :)');
    }
  };
  return (
    <PdfInner>
      <CloseBtn onClick={closePdf}>
        <GrClose />
      </CloseBtn>
      <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <Bottom>
        <Btn onClick={gotoBeforePage}>
          <BsFillArrowLeftCircleFill />
        </Btn>
        <Btn onClick={goToNextPage}>
          <BsFillArrowRightCircleFill />
        </Btn>
      </Bottom>
    </PdfInner>
  );
}

const PdfInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 370px;
`;

const Btn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const CloseBtn = styled(Btn)`
  position: relative;
  left: 175px;
`;
