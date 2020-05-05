import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from 'styled-components';

export const CodeContainer = styled.pre`
  font-family: ${({ theme }) => theme.font.monospace};
  text-align: left;
  margin: 1rem 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 3px;

  & .token-line {
    line-height: 1.3rem;
    height: 1.3rem;
  }
`;

export const LineNumber = styled.span`
  display: inline-block;
  width: 2rem;
  user-select: none;
  opacity: 0.4;
`;

/*
  TODO:
    - line highlighting
    - code copy button
    - toggle line numbers
    - code block title
    - language tabs
*/
export default function CodeBlock({ children: { props } }) {
  const code = props.children.trim();
  const language = props.className && props.className.replace('language-', '');

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeContainer className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              <LineNumber>{i + 1}</LineNumber>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </CodeContainer>
      )}
    </Highlight>
  );
}
