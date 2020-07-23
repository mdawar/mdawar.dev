import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${({ theme }) => theme.font.sans};
    line-height: ${({ theme }) => theme.lineHeight};
    background: ${({ theme }) => theme.color.bg};
    color: ${({ theme }) => theme.color.text};
  }

  a {
    color: ${({ theme }) => theme.color.link};
    text-decoration: none;
    border-bottom: 1px dotted;

    &:hover {
      border-bottom-style: solid;
    }

    &[target="_blank"]::after {
      content: "↗";
      display: inline-block;
      transition: transform 0.1s ease-in-out 0s;
    }

    &[target="_blank"]:hover::after {
      transform: translate(0.1em, -0.1em);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.margin}rem;
  }

  h1 {font-size: 2rem;}
  h2 {font-size: 1.75rem;}
  h3 {font-size: 1.5rem;}
  h4 {font-size: 1.25rem;}
  h5 {font-size: 1.125rem;}
  h6 {font-size: 1rem;}

  p:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.margin}rem;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }

  small {
    font-size: smaller;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  button,
  input,
  textarea,
  select {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    outline: none;
  }
`;

export const horizontalBg = ({ theme }) => css`
  background: ${theme.color.border};
  background: linear-gradient(
    90deg,
    ${theme.color.bg} 0%,
    ${theme.color.border} 25%,
    ${theme.color.border} 75%,
    ${theme.color.bg} 100%
  );
`;

export const verticalBg = ({ theme }) => css`
  background: ${theme.color.border};
  background: linear-gradient(
    180deg,
    ${theme.color.bg} 0%,
    ${theme.color.border} 25%,
    ${theme.color.border} 75%,
    ${theme.color.bg} 100%
  );
`;
