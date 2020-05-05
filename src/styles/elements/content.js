import styled from 'styled-components';

export const Content = styled.div`
  ul,
  ol {
    padding-left: 2.5rem;
    margin-bottom: 1rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ol ul,
  ul ul {
    list-style: circle;
    margin-bottom: 0;
  }

  blockquote {
    margin: 1.5rem 2.5rem;
  }

  hr {
    border: 0.02rem solid ${({ theme }) => theme.color.border};
  }
`;
