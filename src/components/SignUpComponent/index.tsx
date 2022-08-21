import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { CreateUser } from 'constants/types/user/createUser';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { signUp } from 'features/user/userSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { ErrorType } from '../../constants/types/notification/errorType';

const SignUpComponent = () => {
  const init = {
    avatar: '',
    birthday: new Date(),
    email: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    password: '',
    phone: '',
    rePassword: '',
    username: '',
  } as CreateUser;
  const google = `${process.env.REACT_APP_API_URL}api/google/auth`;
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(init);
  const [errPassword, setErrPassword] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const userLogin = useAppSelector(state => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userLogin.isAuthentication) {
      navigate('/trang-chu');
    }
  }, [userLogin, navigate]);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const inputHandle = (e: any) => {
    setUser(() => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name === 'phone') {
      if (!user.phone || user.phone === '') {
        setUser(() => ({
          ...user,
          phone: undefined,
        }));
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());

    const result = await dispatch(signUp(user));
    if (result.meta.requestStatus === 'rejected') {
      const err = result.payload as ErrorType;
      const mess = String(err.message);
      dispatch(hideLoading());
      dispatch(showAlert({ color: 'error', message: mess }));
    } else {
      dispatch(hideLoading());
      dispatch(
        showAlert({
          color: 'success',
          message: 'Đăng ký tài khoản thành công! Vui lòng đăng nhập lại',
        })
      );
      navigate('/dang-nhap');
    }
  };

  const handleInputPassword = (e: any) => {
    setUser(() => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
    if (user.password !== user.rePassword) {
      setErrPassword(true);
    } else {
      setErrPassword(false);
    }
  };

  return (
    <Card sx={{ minWidth: 275, padding: '30px' }}>
      <CardHeader
        title='ĐĂNG KÝ TÀI KHOẢN'
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
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <TextField
                name='firstName'
                variant='outlined'
                required
                value={user.firstName}
                onChange={inputHandle}
                label='Tên'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name='lastName'
                variant='outlined'
                required
                value={user.lastName}
                onChange={inputHandle}
                label='Họ và tên đệm'
              />
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <TextField
                name='email'
                variant='outlined'
                required
                value={user.email}
                onChange={inputHandle}
                label='Email'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name='phone'
                variant='outlined'
                value={user.phone}
                onChange={inputHandle}
                label='Số điện thoại'
              />
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <DatePicker
                disableFuture
                label='Ngày sinh'
                openTo='year'
                views={['year', 'month', 'day']}
                value={user.birthday}
                maxDate={new Date()}
                onChange={(date: Date | null) => {
                  setUser({
                    ...user,
                    birthday: moment(date).toDate(),
                  });
                }}
                renderInput={params => (
                  <TextField {...params} name='birthday' variant='outlined' />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <FormControl fullWidth>
                <InputLabel id='gender'>Giới tính</InputLabel>
                <Select
                  labelId='gender'
                  name='gender'
                  value={user.gender}
                  label='Giới tính'
                  sx={{ m: 1 }}
                  onChange={(event: SelectChangeEvent) => {
                    setUser({
                      ...user,
                      gender: event.target.value,
                    });
                  }}>
                  <MenuItem value='Male'>Nam</MenuItem>
                  <MenuItem value='Female'>Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <TextField
                error={errPassword}
                name='password'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                required
                label='Mật khẩu'
                onChange={handleInputPassword}
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
            <Grid item md={6}>
              <TextField
                error={errPassword}
                name='rePassword'
                variant='outlined'
                type={showPassword ? 'text' : 'password'}
                required
                label='Nhập lại mật khẩu'
                onChange={handleInputPassword}
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
          </Grid>
          <CardActions>
            <Grid container display='flex' flexDirection='column'>
              <Grid container mb={1} mt={2}>
                <Button variant='contained' type='submit' fullWidth>
                  Đăng ký tài khoản
                </Button>
              </Grid>
              <Grid container mb={3}>
                <a href={google} style={{ width: '100%' }}>
                  <Button fullWidth variant='outlined' endIcon={<FcGoogle />}>
                    Đăng ký bằng
                  </Button>
                </a>
              </Grid>
              <Grid container spacing={1} display='flex' flexDirection='column'>
                <Grid item>
                  <Button href='/dang-nhap' fullWidth color='info'>
                    Có tài khoản rồi! Đăng nhập ???
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

export default SignUpComponent;
