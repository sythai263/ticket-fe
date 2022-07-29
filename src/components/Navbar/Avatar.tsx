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
import { useAppSelector } from 'app/hooks';
import { useState } from 'react';

const AvatarNav = () => {
  const user = useAppSelector((state: any) => state.user.current);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const userSetting = [
    {
      display: 'Thông tin cá nhân',
      slug: '/tai-khoan/thong-tin',
    },
    {
      display: 'Đổi mật khẩu',
      slug: '/tai-khoan/doi-mat-khau',
    },
    {
      display: 'Đăng xuất',
      slug: '/dang-xuat',
    },
  ];
  return (
    <>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title='Chức năng'>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.firstName} src={user.avatar} />
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
        </Menu>
      </Box>
    </>
  );
};

export default AvatarNav;
