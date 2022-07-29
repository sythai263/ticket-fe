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
import { useState } from 'react';
import { login } from '../../features/login/userSlice';

const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
    await dispatch(login(user));
    // navigate("/logout");
  };

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
          <CardActions>
            <Grid container justifyContent='center'>
              <Grid item>
                <Button variant='contained' type='submit'>
                  Đăng nhập
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginComponent;
