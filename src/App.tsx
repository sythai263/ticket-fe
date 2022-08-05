import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LinkProps } from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import QRCode from 'pages/QRCode';
import React from 'react';
import {
  BrowserRouter,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  Route,
  Routes,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import ProductPage from './pages/Products';
const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ['"Montserrat"', 'sans-serif'].join(','),
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6f00',
      light: '#ffa040',
      dark: '#c43e00',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f5eb6d',
      light: '#ffff9e',
      dark: '#c0b93c',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const App: React.FC = () => (
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar />
        <Grid container justifyContent='center' marginTop={10}>
          <Routes>
            <Route path='/' element={<ProductPage />} />
            <Route path='/dang-nhap' element={<Login />} />
            <Route path='/qr-code' element={<QRCode />} />
            <Route path='/san-pham' element={<ProductPage />} />
          </Routes>
        </Grid>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default App;
