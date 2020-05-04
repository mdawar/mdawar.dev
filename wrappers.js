import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from './src/components/Layout';
import GlobalStyle from './src/styles/global';
import theme from './src/styles/theme';

// Wrap the root element with the theme provider
export function wrapRootElement({ element }) {
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>;
}

// Wrap the page with the layout element
export function wrapPageElement({ element }) {
  return (
    <>
      <GlobalStyle />
      <Layout>{element}</Layout>
    </>
  );
}
