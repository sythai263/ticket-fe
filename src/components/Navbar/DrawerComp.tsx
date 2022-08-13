import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { NavbarData } from 'app/navbar';
import { logout } from 'features/user/userSlice';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

const DrawerComp = () => {
  const user = useAppSelector((state: any) => state.user);
  const isLoggedIn = user.isAuthentication;
  const dispatch = useDispatch();

  const pages = NavbarData();
  const handleLogout = async () => {
    dispatch(logout());
  };
  if (!isLoggedIn) {
    pages.push({ display: 'Đăng nhập', slug: 'dang-nhap' });
    pages.push({ display: 'Đăng ký', slug: 'dang-ky' });
  }
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        PaperProps={{
          sx: { width: '190px' },
        }}>
        <List>
          {pages.map((page, index) => (
            <ListItemButton key={index} onClick={() => setOpenDrawer(false)}>
              <ListItemIcon>
                <Link color='inherit' underline='none' href={page.slug}>
                  {page.display}
                </Link>
              </ListItemIcon>
            </ListItemButton>
          ))}
          {isLoggedIn && (
            <ListItemButton
              onClick={() => {
                handleLogout();
                setOpenDrawer(false);
              }}>
              Đăng xuất
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <IconButton
        sx={{ color: 'white', marginLeft: 'auto' }}
        onClick={() => setOpenDrawer(!openDrawer)}>
        <BiMenu />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
