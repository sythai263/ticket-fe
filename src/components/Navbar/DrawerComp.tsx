import {
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { logout } from 'features/login/userSlice';
import React, { useState } from 'react';
import { BiMenu } from 'react-icons/bi';
import { useDispatch } from 'react-redux';

const DrawerComp = () => {
  const user = useAppSelector((state: any) => state.user.current);
  const isLoggedIn = user.id;
  const dispatch = useDispatch();

  const pages = [
    {
      display: 'Sự kiện',
      slug: 'su-kien',
    },
    {
      display: 'Quét mã',
      slug: 'nguoi-dung/qr-code',
    },
  ];
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
