import styled from 'styled-components';

export const PostContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.margin}rem;
`;

export const PostInfo = styled.div`
  ${({ theme, spaced }) =>
    spaced &&
    `
    margin-bottom: ${theme.margin}rem;
  `}
`;

export const PostTags = styled.ul`
  display: inline-block;

  li {
    display: inline;
  }

  a {
    /* border: none; */
    color: ${({ theme }) => theme.color.text};
  }

  &::before {
    content: '•';
    margin: 0 0.5rem;
  }
`;
