import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import api from 'api/user.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError } from 'axios';
import { PasswordType } from 'constants/types/user/passwordType';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { logout } from 'features/user/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorType } from '../../constants/types/notification/errorType';

const ChangePasswordComponent = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [info, setInfo] = useState<PasswordType>({
    oldPassword: '',
    password: '',
    rePassword: '',
  });

  const inputHandle = (e: any) => {
    setInfo(() => ({
      ...info,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());
    api
      .changePassword(info)
      .then(() => {
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'success',
            message: 'Đổi mật khẩu thành công ! Vui lòng đăng nhập lại!',
          })
        );
        dispatch(logout());
        navigate('/dang-nhap');
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as ErrorType;
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'error',
            message: data.message,
          })
        );
      });
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: '60px', padding: '30px' }}>
      <CardHeader
        title='Đổi mật khẩu'
        titleTypographyProps={{ sx: { textAlign: 'center' } }}
      />
      <CardContent>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          onSubmit={handleSubmit}
          autoComplete='off'>
          <Grid container>
            <TextField
              name='oldPassword'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              label='Mật khẩu cũ'
              onChange={inputHandle}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Hiện mật khẩu'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container>
            <TextField
              name='password'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              value={info.password}
              label='Mật khẩu'
              onChange={inputHandle}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Hiện mật khẩu'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container>
            <TextField
              name='rePassword'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              value={info.rePassword}
              label='Nhập lại mật khẩu'
              onChange={inputHandle}
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Hiện mật khẩu'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <CardActions>
            <Grid container display='flex' flexDirection='column'>
              <Grid container mb={1} mt={2}>
                <Button variant='contained' type='submit' fullWidth>
                  Đổi mật khẩu
                </Button>
              </Grid>
              <Grid container>
                <Button
                  variant='outlined'
                  fullWidth
                  onClick={() => {
                    navigate('/nguoi-dung/thong-tin');
                  }}>
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordComponent;
