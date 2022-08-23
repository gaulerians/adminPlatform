import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    list-style: none;
  }

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
    height: 100%;
    position: relative;
  }

  body {
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    color: ${props => props.theme.textColor};
    display: flex;
    flex-wrap: wrap;
    background: ${props => props.theme.backgroundColor};
    scrollbar-color: rgba(0, 0, 0, .5) rgba(0, 0, 0, 0);
    scrollbar-width: thin;
    max-width: 100%;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }

  header {
    flex: 0 0 auto;
  }

  main {
    flex: 1 0 auto;
  }

  footer {
    flex: 0 0 auto;
  }

  h1, h2, h3, h4, h5, h6, p, span {
    font-style: normal;
  }

  fieldset {
    border: none;
  }
  
  ol {
    list-style: auto;
  }

  @media(min-width:1200px) {
    /* body {
      font-size: 16px;
    } */
  }

  main {
    display: block;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  img {
    border-style: none;
    display: block;
    line-height:0;
    object-fit: cover;
  }

  em, strong, address {
    font-style: normal;
  }

  strong {
    color: inherit;
  }

  mark {
    background: transparent;
    color: inherit;
  }

  button,
  select { /* 1 */
    text-transform: none;
  }

  button {
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  [hidden] {
    display: none;
  }

  *::-webkit-scrollbar {
    -webkit-appearance: none;
  }

  *::-webkit-scrollbar:vertical {
    width:10px;
    background: #1F1F24;
  }

  *::-webkit-scrollbar-button:increment,
  *::-webkit-scrollbar-button {
    display: none;
  } 

  *::-webkit-scrollbar:horizontal {
    height: 10px;
    background: #1F1F24;
  }

  *::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.brandColor};
    border-radius: 20px;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  svg {
    height: auto;
  }

  .active,
  .navbarMenu {
    color: ${props => props.theme.brandColor} !important;

    svg {
      fill: ${props => props.theme.brandColor} !important;
    }
  }

  .expandHeader {
    @media(min-width:1200px) {
      position: relative;
      z-index: 5000;
    }
  }

  .navbarMenu {
    position: relative;

    &::before {
      content: '';
      background: ${props => props.theme.brandColor};;
      width:5px;
      height: 100%;
      position: absolute;
      left: 0;
      border-radius: 0 8px 8px 0;
    }
  }

  .logoName {
    color: ${props => props.theme.brandColor};
  }

  .logoFooterLanding {
    height: 55px;
    margin: 0 0 50px 0;
  }
`

export default globalStyles
