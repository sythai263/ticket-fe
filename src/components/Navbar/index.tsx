import { Link, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { NavbarData } from 'app/navbar';
import React from 'react';
import { BsShop } from 'react-icons/bs';
import AvatarNav from './Avatar';
import DrawerComponent from './DrawerComp';
const marginLeft = '20px';

const Navbar = () => {
  const user = useAppSelector((state: any) => state.user.current);
  const isLoggedIn = user.id;
  const pages = NavbarData();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <AppBar position='sticky'>
        <Toolbar>
          <Link href='/' color='inherit'>
            <BsShop size={40} />
          </Link>
          {isMatch ? (
            <>
              <DrawerComponent />
            </>
          ) : (
            <>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  marginLeft: 'auto',
                }}>
                {pages.map(page => (
                  <Button key={page.slug} color='inherit' href={page.slug}>
                    {page.display}
                  </Button>
                ))}
              </Box>
              {isLoggedIn ? (
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
