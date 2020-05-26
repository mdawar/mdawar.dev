import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import { parseOptions } from './utils';
import Copy from './copy';
import {
  Container,
  BlockTitle,
  CodeContainer,
  Pre,
  Line,
  LineNo,
  LineContent
} from './styles';

export default function CodeBlock({ children: { props } }) {
  const code = props.children.trim();
  const language = props.className && props.className.replace('language-', '');
  const options = parseOptions(props.metastring);

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Container>
          {options.copy && <Copy content={code} />}
          {options.title && <BlockTitle>{options.title}</BlockTitle>}
          <CodeContainer
            className={className}
            style={style}
            data-language={options.languageTab ? language : null}
          >
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
        </Container>
      )}
    </Highlight>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired
};
