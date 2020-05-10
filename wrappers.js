import React from 'react';
import { ThemeProvider } from 'styled-components';
import Layout from './src/components/Layout';
import { GlobalStyle } from './src/styles/global';
import theme from './src/styles/theme';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './src/components/CodeBlock';

// Components to override in the rendered markdown
// https://mdxjs.com/getting-started#table-of-components
const components = {
  // Code blocks
  pre: CodeBlock
};

// Wrap the root element with the context providers
export function wrapRootElement({ element }) {
  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>{element}</MDXProvider>
    </ThemeProvider>
  );
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
