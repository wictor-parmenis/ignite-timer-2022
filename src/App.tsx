import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { CycleProvider } from './contexts/CycleContext';
import { Router } from './routes';
import { GlobalStyle } from './styles/global/styles';
import { defaultTheme } from './styles/themes/default';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <CycleProvider>
        <Router />
      </CycleProvider>
    </BrowserRouter>
    <GlobalStyle />
  </ThemeProvider>
);

export default App;
