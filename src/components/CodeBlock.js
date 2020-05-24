import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from 'styled-components';

const Pre = styled.pre`
  font-family: ${({ theme }) => theme.font.monospace};
  text-align: left;
  margin: ${({ theme }) => theme.margin}rem 0;
  padding: 1rem;
  overflow: auto;
  border-radius: ${({ theme }) => theme.borderRadius};

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.thumbColor};
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollbar.trackColor};
  }
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

function parseOptions(metastring) {
  const defaults = {
    // Show line numbers
    lineNumbers: false
  };

  if (metastring) {
    const options = {};

    // Each option is going to be wrapped with curly brackets
    for (let option of metastring.split('{').map((i) => i.trim())) {
      if (option) {
        let [name, value] = option
          // Remove the closing curly bracket
          .slice(0, -1)
          // The option and its value are split with a semicolon
          .split(':')
          .map((i) => i.trim());

        if (name && value) {
          if (name === 'lineNumbers') {
            value = value.toLowerCase() === 'true';
          }

          options[name] = value;
        }
      }
    }

    return { ...defaults, ...options };
  }

  return defaults;
}

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
  const options = parseOptions(props.metastring);

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <Line key={i} {...getLineProps({ line, key: i })}>
              {options.lineNumbers && <LineNo>{i + 1}</LineNo>}
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
