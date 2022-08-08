import {
  Avatar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../../features/login/userSlice';

const AvatarNav = () => {
  const user = useAppSelector((state: any) => state.user);
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isLogout, setLogout] = useState(user.isAuthenticate);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    setAnchorElUser(null);
    dispatch(logout());
    setLogout(true);
  };
  const userSetting = [
    {
      display: 'Thông tin cá nhân',
      slug: '/nguoi-dung/thong-tin',
    },
    {
      display: 'Đổi mật khẩu',
      slug: '/nguoi-dung/doi-mat-khau',
    },
  ];
  if (isLogout) {
    return <Navigate to='/dang-nhap' />;
  }
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Chức năng'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.current.firstName} src={user.current.avatar} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
          {userSetting.map(setting => (
            <MenuItem key={setting.slug} onClick={handleCloseUserMenu}>
              <Link color='inherit' underline='none' href={setting.slug}>
                <Typography textAlign='center'>{setting.display}</Typography>
              </Link>
            </MenuItem>
          ))}
          <MenuItem key='dang-xuat' onClick={handleLogout}>
            <Typography textAlign='center'>Đăng xuất</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default AvatarNav;
