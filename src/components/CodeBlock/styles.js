import styled from 'styled-components';

export const Container = styled.div`
  font-family: ${({ theme }) => theme.font.monospace};
  position: relative;
  margin: ${({ theme }) => theme.margin}rem 0;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
`;

export const CodeContainer = styled.div`
  position: relative;
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

  /* Language tabs */
  &[data-language] {
    padding-top: 2rem;
  }

  &[data-language]::before {
    content: attr(data-language);
    position: absolute;
    top: 0;
    left: 1rem;
    font-size: 0.8rem;
    line-height: 1;
    border-radius: ${({ theme }) =>
      `0 0 ${theme.borderRadius} ${theme.borderRadius}`};
    letter-spacing: 0.05rem;
    padding: 0.3rem 0.5rem;
    text-transform: uppercase;
    background: linen;
    color: black;
  }

  &[data-language='js']::before,
  &[data-language='javascript']::before {
    background: #f7df1e;
    color: black;
  }

  &[data-language='jsx']::before {
    background: #61dafc;
    color: black;
  }

  &[data-language='html']::before {
    background: #f16524;
    color: white;
  }

  &[data-language='css']::before {
    background: #005a9c;
    color: white;
  }

  &[data-language='python']::before {
    background: #306898;
    color: white;
  }

  &[data-language='bash']::before {
    background: #f7df1e;
    color: black;
  }

  &[data-language='shell']::before {
    background: #f7df1e;
    color: black;
  }

  &[data-language='graphql']::before {
    background: #e01e97;
    color: white;
  }
`;

export const Pre = styled.pre`
  text-align: left;
  overflow: initial;
  float: left;
  min-width: 100%;
`;

export const Line = styled.div`
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

export const LineNo = styled.span`
  display: inline-block;
  width: 2.5rem;
  text-align: right;
  padding-right: 1rem;
  user-select: none;
  opacity: 0.5;
`;

export const LineContent = styled.span`
  display: inline-block;
`;

export const BlockTitle = styled.div`
  background: ${({ theme }) => theme.color.codeTitle.bg};
  color: ${({ theme }) => theme.color.codeTitle.text};
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.codeTitle.border};
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};

  + ${CodeContainer} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export const CopyButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.3s;
  background: ${({ theme }) => theme.color.codeTitle.text};
  color: ${({ theme }) => theme.color.codeTitle.bg};
  padding: 0.2rem 0.4rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  z-index: 1;

  ${Container}:hover & {
    opacity: 0.3;
  }

  &&:hover {
    opacity: 1;
  }
`;
