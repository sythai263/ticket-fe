import { Link, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { useAppSelector } from 'app/hooks';
import React, { useState } from 'react';
import { BsCart, BsShop } from 'react-icons/bs';
import AvatarNav from './Avatar';
import DrawerComponent from './DrawerComp';
const marginLeft = '20px';

const Navbar = () => {
  const user = useAppSelector((state: any) => state.user.current);
  const isLoggedIn = user.id;
  const pages = [
    {
      display: 'Sản phẩm',
      slug: 'san-pham',
    },
    {
      display: 'Quét mã',
      slug: 'qr-code',
    },
  ];

  const [value, setValue] = useState(0);
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
              <Tabs
                sx={{ marginLeft: 'auto' }}
                textColor='inherit'
                value={value}
                onChange={(e, value) => setValue(value)}>
                {pages.map((page, index) => (
                  <Tab
                    key={index}
                    label={page.display}
                    LinkComponent={Link}
                    href={page.slug}></Tab>
                ))}
              </Tabs>
              <Button
                sx={{ marginLeft: 'auto' }}
                color='inherit'
                LinkComponent={Link}
                href='gio-hang'>
                <BsCart size={30} />
              </Button>
              {isLoggedIn ? (
                <AvatarNav />
              ) : (
                <>
                  <Button
                    sx={{ marginLeft }}
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
