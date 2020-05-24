import styled from 'styled-components';

export const Container = styled.div`
  margin: ${({ theme }) => theme.margin}rem 0;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
`;

export const CodeContainer = styled.div`
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

export const Pre = styled.pre`
  font-family: ${({ theme }) => theme.font.monospace};
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
  font-family: ${({ theme }) => theme.font.monospace};
  background: #0d2a46;
  color: #d6deeb;
  padding: 1rem;
  border-bottom: 1px solid #66798f;
  border-top-left-radius: ${({ theme }) => theme.borderRadius};
  border-top-right-radius: ${({ theme }) => theme.borderRadius};

  + ${CodeContainer} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;
