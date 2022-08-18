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
import { useAppDispatch } from 'app/hooks';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { login } from 'features/user/userSlice';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';
import { ErrorType } from '../../constants/types/notification/errorType';

const LoginComponent = () => {
  const google = `${process.env.REACT_APP_API_URL}api/google/auth`;
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [authenticate, setAuthenticate] = useState(token ? true : false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const inputHandle = (e: any) => {
    setUser(() => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());
    const result = await dispatch(login(user));
    if (result.meta.requestStatus === 'rejected') {
      const err = result.payload as ErrorType;
      const mess = String(err.message);
      setAuthenticate(false);
      dispatch(hideLoading());
      dispatch(showAlert({ color: 'error', message: mess }));
    } else {
      setAuthenticate(true);
      dispatch(hideLoading());
      dispatch(
        showAlert({ color: 'success', message: 'Đăng nhập thành công!' })
      );
    }
  };

  if (authenticate) {
    return <Navigate to='/trang-chu' />;
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: '60px', padding: '30px' }}>
      <CardHeader
        title='Đăng nhập'
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
              name='username'
              variant='outlined'
              required
              fullWidth
              id='username'
              label='Tên tài khoản'
              onChange={inputHandle}
              autoFocus
            />
          </Grid>
          <Grid container>
            <TextField
              name='password'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              id='password'
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
          <CardActions>
            <Grid container display='flex' flexDirection='column'>
              <Grid container mb={1} mt={2}>
                <Button variant='contained' type='submit' fullWidth>
                  Đăng nhập
                </Button>
              </Grid>
              <Grid container>
                <a href={google} style={{ width: '100%' }}>
                  <Button fullWidth variant='outlined' endIcon={<FcGoogle />}>
                    Đăng nhập với
                  </Button>
                </a>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginComponent;
