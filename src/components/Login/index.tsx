import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  AlertColor,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Navigate } from 'react-router-dom';
import { ErrorType } from '../../constants/types/errorType';
import { login } from '../../features/login/userSlice';

const LoginComponent = () => {
  const google = `${process.env.REACT_APP_API_URL}api/google/auth`;
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [typeNoti, setTypeNoti] = useState<AlertColor>('success');
  const [message, setMessage] = useState('');
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
    setOpenDialog(true);
    const result = await dispatch(login(user));
    if (result.meta.requestStatus === 'rejected') {
      const err = result.payload as ErrorType;
      const mess = String(err.message);
      setAuthenticate(false);
      setMessage(mess);
      setTypeNoti('error');
      setOpenSnack(true);
      setOpenDialog(false);
    } else {
      setAuthenticate(true);
      setMessage('Đăng nhập thành công !');
      setTypeNoti('success');
      setOpenSnack(true);
      setOpenDialog(false);
    }
  };

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={openSnack}
        autoHideDuration={3000}
        onClose={handleCloseSnack}>
        <Alert
          onClose={handleCloseSnack}
          sx={{ width: '100%' }}
          severity={typeNoti}>
          {message}
        </Alert>
      </Snackbar>
      <Dialog open={openDialog} fullWidth>
        <DialogTitle />
        <DialogContent>
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default LoginComponent;
