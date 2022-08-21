import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import api from 'api/user.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ResetPassword } from 'constants/types/user/ResetPassword';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { logout } from 'features/user/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorType } from '../../constants/types/notification/errorType';

const ForgotPasswordComponent = () => {
  const init = {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  } as ResetPassword;
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState(init);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

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
      .resetPassword(info)
      .then((response: AxiosResponse) => {
        const data = response.data as ErrorType;
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'success',
            message: data.message,
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
    <Card sx={{ minWidth: 275, padding: '30px' }}>
      <CardHeader
        title='KHÔI PHỤC MẬT KHẨU'
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
              label='Tên tài khoản'
              onChange={inputHandle}
              autoFocus
            />
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <TextField
                name='firstName'
                variant='outlined'
                required
                value={info.firstName}
                onChange={inputHandle}
                label='Tên'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name='lastName'
                variant='outlined'
                required
                value={info.lastName}
                onChange={inputHandle}
                label='Họ và tên đệm'
              />
            </Grid>
          </Grid>
          <Grid container>
            <TextField
              name='email'
              variant='outlined'
              required
              fullWidth
              value={info.email}
              onChange={inputHandle}
              label='Email'
            />
          </Grid>

          <CardActions>
            <Grid container display='flex' flexDirection='column'>
              <Grid container mb={3} mt={2}>
                <Button variant='contained' type='submit' fullWidth>
                  Quên mật khẩu
                </Button>
              </Grid>
              <Grid container spacing={1} display='flex' flexDirection='column'>
                <Grid item>
                  <Button href='/dang-nhap' fullWidth color='info'>
                    Đã nhớ ra mật khẩu! Đăng nhập ???
                  </Button>
                </Grid>
                <Grid item>
                  <Button href='/dang-ky' fullWidth color='info'>
                    Dẹp luôn đi! Đăng ký cho nhanh ???
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordComponent;
