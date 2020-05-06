import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from 'styled-components';

const Pre = styled.pre`
  font-family: ${({ theme }) => theme.font.monospace};
  text-align: left;
  margin: 1rem 0;
  padding: 1rem;
  overflow-x: auto;
  border-radius: 3px;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1rem;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
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
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </Line>
          ))}
        </Pre>
      )}
    </Highlight>
  );
}
