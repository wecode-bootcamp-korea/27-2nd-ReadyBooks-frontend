import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Router from './Router';
// import PdfViewerComponent from './components/PdfViewerComponent';
import theme from './styles/theme.js';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

ReactDOM.render(
  <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Router />
      {/* <PdfViewerComponent document="Document.pdf" /> */}
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
