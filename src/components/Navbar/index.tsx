import { Avatar, Link, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { NavbarData } from 'app/navbar';
import axios from 'axios';
import React from 'react';
import AvatarNav from './Avatar';
import DrawerComponent from './DrawerComp';
const marginLeft = '20px';

const Navbar = () => {
  const user = useAppSelector((state: any) => state.user);
  const navActive = useAppSelector((state: any) => state.navbar.active);
  const pages = NavbarData();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  axios.defaults.headers.common = {
    Authorization: `Bearer ${user.token}`,
  };

  return (
    <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <Link href='/' color='inherit'>
            <Avatar src='/logo.svg' alt='logo' />
          </Link>
          {isMatch ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  marginLeft: 'auto',
                }}>
                {pages.map(page => (
                  <Button
                    key={page.id}
                    color={navActive === page.id ? 'primary' : 'inherit'}
                    href={page.slug}>
                    {page.display}
                  </Button>
                ))}
              </Box>
              {user.isAuthentication ? (
                <Box sx={{ marginLeft: 'auto' }}>
                  <AvatarNav />
                </Box>
              ) : (
                <>
                  <Button
                    sx={{ marginLeft: 'auto' }}
                    variant='contained'
                    LinkComponent={Link}
                    href='dang-nhap'>
                    Đăng nhập
                  </Button>
                  <Button
                    sx={{ marginLeft }}
                    variant='contained'
                    LinkComponent={Link}
                    href='dang-ky'>
                    Đăng ký
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
export default Navbar;
