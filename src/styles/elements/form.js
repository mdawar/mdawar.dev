import styled from 'styled-components';

export const Form = styled.form`
  input,
  textarea,
  select {
    font-family: ${({ theme }) => theme.font.sans};
    background-color: white;
    border: 1px solid ${({ theme }) => theme.color.form.border};
    color: ${({ theme }) => theme.color.text};
    padding: ${({ theme }) => theme.padding / 2}rem;
    margin-bottom: ${({ theme }) => theme.margin / 2}rem;
    border-radius: ${({ theme }) => theme.borderRadius};

    &:hover {
      border-color: ${({ theme }) => theme.color.form.borderHover};
    }

    &:focus {
      border-color: ${({ theme }) => theme.color.form.borderFocus};
      box-shadow: ${({ theme }) =>
        `0 0 0 0.13rem ${theme.color.form.boxShadowFocus}`};
    }
  }

  input,
  textarea {
    max-width: 100%;
    width: 100%;
  }

  textarea {
    resize: vertical;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.margin / 4}rem;
  }
`;

export const Button = styled.button`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: 1rem;
  line-height: 1;
  background: ${({ theme }) => theme.color.button.bg};
  color: ${({ theme }) => theme.color.button.text};
  padding: ${({ theme }) => `${theme.padding / 2}rem ${theme.padding}rem`};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  text-align: center;
  user-select: none;

  &:hover {
    opacity: 0.9;
  }
`;
