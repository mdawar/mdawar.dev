import styled from 'styled-components';
import { horizontalBg } from '../../styles/global';

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
    background: bisque;
    border: 1px solid burlywood;
    padding: 0.1rem 0.2rem;
    border-radius: ${({ theme }) => theme.borderRadius};
  }

  hr {
    height: 1px;
    margin: ${({ theme }) => theme.margin}rem 0;
    ${horizontalBg};
    border: none;
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
    border: ${({ theme }) => theme.table.borderWith} solid
      ${({ theme }) => theme.table.borderColor};
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

export const SectionHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  padding-bottom: ${({ theme }) => theme.padding / 2}rem;
  margin-bottom: ${({ theme }) => theme.padding}rem;

  h2 {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.color.text};
  }

  &::after {
    content: '';
    ${horizontalBg};
    position: absolute;
    width: 100%;
    height: 0.01rem;
    left: 0;
    bottom: 0;
  }
`;
