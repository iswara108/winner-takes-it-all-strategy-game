import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
html {
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
}
`;
