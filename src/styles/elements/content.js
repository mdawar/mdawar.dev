import styled from 'styled-components';

export const Content = styled.div`
  p:not(:last-child),
  ol:not(:last-child),
  ul:not(:last-child),
  blockquote:not(:last-child),
  table:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.margin}rem;
  }

  ul,
  ol {
    padding-left: 2.5rem;
  }

  ul {
    list-style: disc outside;
  }

  ol {
    list-style: decimal outside;
  }

  ol ul,
  ul ul {
    list-style-type: circle;
  }

  ul ul ul,
  ol ul ul,
  ul ol ul {
    list-style-type: square;
  }

  li + li {
    margin: 0.2rem 0;
  }

  blockquote {
    background-color: whitesmoke;
    border-left: 5px solid ${({ theme }) => theme.color.border};
    padding: 1.25rem 1.5rem;
  }

  code {
    font-family: ${({ theme }) => theme.font.monospace};
    background: #011627;
    color: #d6deeb;
    padding: 0.1rem 0.2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  hr {
    border: 0.02rem solid ${({ theme }) => theme.color.border};
    margin: ${({ theme }) => theme.margin}rem 0;
  }

  sup,
  sub {
    font-size: smaller;
  }

  sup {
    vertical-align: super;
  }

  sub {
    vertical-align: sub;
  }

  table {
    width: 100%;
  }

  table td,
  table th {
    border: ${({ theme }) => theme.table.borderWith} solid ${({ theme }) => theme.table.borderColor};
    padding: 0.5em 0.75em;
    vertical-align: top;
  }

  table th:not([align]) {
    text-align: left;
  }

  table thead td,
  table thead th {
    border-bottom-width: ${({ theme }) => theme.table.headBorderWidth};
    font-weight: ${({ theme }) => theme.table.headFontWeight};
  }

  table tfoot td,
  table tfoot th {
    border-top-width: ${({ theme }) => theme.table.footBorderWidth};
    font-weight: ${({ theme }) => theme.table.footFontWeight};
  }
`;
