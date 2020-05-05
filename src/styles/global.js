import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    font-family: ${({ theme }) => theme.font.sans};
    line-height: 1.6;
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
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin-bottom: 1rem;
  }

  h1 {font-size: 2rem;}
  h2 {font-size: 1.75rem;}
  h3 {font-size: 1.5rem;}
  h4 {font-size: 1.25rem;}
  h5 {font-size: 1.125rem;}
  h6 {font-size: 1rem;}

  p:not(:last-child) {
    margin-bottom: 1rem;
  }

  strong {
    font-weight: 600;
  }

  em {
    font-style: italic;
  }
`;
