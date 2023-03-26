import { createGlobalStyle } from 'styled-components';
import AppleSDGothicNeoR from './assets/fonts/AppleSDGothicNeoR.ttf';

export const primaryColor = '#D07C81';
export const secondaryColor = '#79756E';
export const pointColor = '#613B3E';
export const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
@font-face {
  font-family: "AppleSDGothicNeoR";
  src: url(${AppleSDGothicNeoR});
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: "AppleSDGothicNeoR", 'Noto Sans KR Black' !important;
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  margin: 0;
  line-height: 1;
}

ul {
  list-style: none;
  padding-left: 0;
}

`;
