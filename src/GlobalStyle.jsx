import { createGlobalStyle } from 'styled-components';
import AppleSDGothicNeoB from './assets/fonts/AppleSDGothicNeoB.ttf';
import AppleSDGothicNeoM from './assets/fonts/AppleSDGothicNeoM.ttf';

// background: linear-gradient(270deg, rgba(87, 154, 255, 0.3) 0%, rgba(0, 186, 244, 0.008) 100%);

export const primaryColor = '#0D87AD';
export const secondaryColor = '#FFAF81';
export const pointColor = '#2D2D2D';
export const bgColor = '#133337';
export const bgTextColor = '#fff';
export const errorColor = '#823434';
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
  font-family: "AppleSDGothicNeoM";
  src: url(${AppleSDGothicNeoM});
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "AppleSDGothicNeoB";
  src: url(${AppleSDGothicNeoB});
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "AppleSDGothicNeoM", 'Noto Sans KR Black' !important;
  box-sizing: border-box;
}

*::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

*::-webkit-scrollbar-thumb {
  background: ${pointColor};  
  border-radius: 10px;
}

*::selection {
  color: black;
  background: #daa520;
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}   
}
@keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}   
}

@-webkit-keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}   
}
@-webkit-keyframes fadeOut {
  from {opacity: 1;}
  to {opacity: 0;}   
}

.fadeIn{
  animation: fadeIn;
  animation-duration: 0.8s;
}

.fadeOut{
  animation: fadeOut;
  animation-duration: 0.8s;
}

ul {
  list-style: none;
  padding-left: 0;
}

`;
