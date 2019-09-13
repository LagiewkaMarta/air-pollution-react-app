import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body {
    min-height: 100vh;
    background: #43C6AC;
    background: linear-gradient(to right, #191654, #43C6AC);
}
`;

export default GlobalStyle;
