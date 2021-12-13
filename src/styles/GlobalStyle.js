import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
${reset}

* {
  box-sizing: border-box;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif'; 
}

a {
  text-decoration: none;
}

input {
  border: none;
  background: transparent;
}

input:focus {
  outline: none;
}
`;

export default GlobalStyle;
