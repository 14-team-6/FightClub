import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  @font-face {
    font-family: Pixeboy;
    src:
      url("../public/font/Pixeboy.woff2") format("woff2"),
      url("../public/font/Pixeboy.woff") format("woff");
    font-style: normal;
    font-display: swap;
  }
`;
