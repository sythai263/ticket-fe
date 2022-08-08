import { Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { LinkProps } from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Navbar from 'components/Navbar';
import vi from 'date-fns/locale/vi';
import React from 'react';
import {
  BrowserRouter,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import MainRoutes from 'routes/MainRoutes';
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
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={vi}>
        <BrowserRouter>
          <Navbar />
          <Grid container justifyContent='center' marginTop={2}>
            <MainRoutes />
          </Grid>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  </>
);

export default App;
