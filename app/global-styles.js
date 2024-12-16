import { createGlobalStyle } from 'styled-components';
import yekan from '../assets/fonts/Yekan Bakh FaNum 04 Regular.woff';
import yekanb from '../assets/fonts/Yekan Bakh FaNum 06 Bold.woff';
import graphik from '../assets/fonts/Graphik-Medium.woff2';
import graphikr from '../assets/fonts/Graphik-Regular.woff2';
import yekanfat from '../assets/fonts/Yekan Bakh EN 08 Fat.woff';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'yekan';
    src: url(${yekan}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }


  @font-face {
  font-family: 'yekanfat';
  src: url(${yekanfat}) format('truetype');
  font-weight: normal;
  font-style: normal;
  }

  @font-face {
    font-family: 'yekanb';
    src: url(${yekanb}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }


  @font-face {
    font-family: 'graphik';
    src: url(${graphik}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'graphikr';
    src: url(${graphikr}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  *{
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      outline:0 !important;
  }

  html{
    text-align: unset !important;
    height: 100%;
    position: relative;
    box-sizing: border-box;
  }







  body{
    font-family: yekanb, Serif, Sans-serif !important;
    font-size: 14px !important;
    height: 100%;
    position: relative;
    background: #f4f6fa;
  }

  select{
    padding-inline-end:0 !important;
  }
a{
   padding-inline-start: 0 !important;
   padding-inline-end: 0 !important;
}
a:hover{
  text-decoration: none !important;
}

button:focus{
  box-shadow: unset !important;
}

  #app{
    height: 100%;
    position: relative;
    width: 100%;
  }


  .form-control {
    font-weight: 100;
    text-align: left;
    font-size: 15px;
    font-family: yekan, Serif, Sans-serif;
    direction: ltr;
    height: 57px !important;
    background-clip: padding-box;
    border: 1px solid #cbcdd9;
    border-radius: .25rem;
    box-shadow: inset 0 0 0 transparent;
    transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    width: 100% !important;


  }


  ul{
    list-style-type: none;
  }



  input:focus {
    border-color: #1652f0 !important;
    outline: 0 !important;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0) !important
  }

  input[type="text"]:disabled{background-color:#F4F6FA;}



  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    outline: none !important;
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
  }

  .checkbox-scale {
    transform: scale(1.5);
  }


  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #767676;
  opacity: 1; /* Firefox */
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #767676;
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #767676;
}
.btn-file {
  position: relative;
  overflow: hidden;
}
.btn-file input[type=file] {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;
  background: white;
  cursor: inherit;
  display: block;
}


.Toastify__toast-body { font-family: 'yekan',sans-serif; }

.flex{
  display: flex;
}


#scrollstyle::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#scrollstyle::-webkit-scrollbar {
  width: 7px;
  background-color: #F5F5F5;
}

#scrollstyle::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #cccccc;
}

@-webkit-keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}


`;

export default GlobalStyle;
