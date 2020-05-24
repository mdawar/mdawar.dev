import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import rangeParser from 'parse-numeric-range';
import theme from 'prism-react-renderer/themes/nightOwl';
import styled from 'styled-components';

const CodeContainer = styled.div`
  margin: ${({ theme }) => theme.margin}rem 0;
  padding: 1rem;
  overflow: auto;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);

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

const Pre = styled.pre`
  font-family: ${({ theme }) => theme.font.monospace};
  text-align: left;
  overflow: initial;
  float: left;
  min-width: 100%;
`;

const Line = styled.div`
  padding-right: 1rem;

  ${({ highlight }) =>
    highlight &&
    `
    display: block;
    background-color: #0d2a46;
    margin-right: -1rem;
    margin-left: -1rem;
    padding-left: 0.75rem;
    border-left: 0.25rem solid #999;
  `}
`;

const LineNo = styled.span`
  display: inline-block;
  width: 2.5rem;
  text-align: right;
  padding-right: 1rem;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: inline-block;
`;

function parseOptions(metastring) {
  const defaults = {
    // Show line numbers
    lineNumbers: false,
    // Array of line numbers to highlight
    highlight: []
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
          } else if (name === 'highlight') {
            value = rangeParser(value);
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
    - code copy button
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
        <CodeContainer className={className} style={style}>
          <Pre>
            {tokens.map((line, i) => (
              <Line
                key={i}
                {...getLineProps({ line, key: i })}
                highlight={options.highlight.includes(i + 1)}
              >
                {options.lineNumbers && <LineNo>{i + 1}</LineNo>}
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        </CodeContainer>
      )}
    </Highlight>
  );
}
