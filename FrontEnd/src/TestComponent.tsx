import styled, { createGlobalStyle, css } from 'styled-components';

// theme is now fully typed
export const MyComponent = styled.div`
  color: ${props => props.theme.colors.main};
`;

// theme is also fully typed
export const MyGlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.secondary};
  }
`;

// and this theme is fully typed as well
export const cssHelper = css`
  border: 1px solid ${props => props.theme.borderRadius};
`;