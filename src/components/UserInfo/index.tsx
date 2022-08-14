import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers';
import userApi from 'api/user.api';
import { useAppDispatch } from 'app/hooks';
import DialogComponent from 'components/DialogComponent';
import SnackComponent from 'components/SnackComponent';
import { ErrorType } from 'constants/types/notification/errorType';
import { SnackType } from 'constants/types/notification/snackType';
import { User, UserUpdate } from 'constants/types/user/userType';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { updateUser } from 'features/user/userSlice';
import { useEffect, useState } from 'react';

const UserInfoComponent = () => {
  const initial = { birthday: new Date() };
  const [allowUpdate, setAllowUpdate] = useState(true);
  const [gender, setGender] = useState('');
  const [user, setUser] = useState<User>(initial);
  const [birthday, setBirthday] = useState<Date | null | undefined>(new Date());
  const [noti, setNoti] = useState<SnackType>({ color: 'error', message: '' });
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleChange = (newValue: Date | null) => {
    setBirthday(newValue);
  };
  useEffect(() => {
    userApi.getUser().then(response => {
      const { data } = response;
      const usr = { ...response.data, birthday: new Date(data.birthday) };
      setUser(usr);
      setGender(usr.gender);
      setBirthday(usr.birthday);
      dispatch(hideLoading());
    });
  }, [dispatch]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());
    if (allowUpdate) {
      setAllowUpdate(false);
      dispatch(hideLoading());
    } else {
      const info = {
        birthday: user.birthday,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
      } as UserUpdate;
      const response = await dispatch(updateUser(info));
      if (response.meta.requestStatus === 'rejected') {
        const err = response.payload as ErrorType;
        const mess = String(err.message);
        setNoti({ color: 'error', message: mess });
        dispatch(hideLoading());
        dispatch(showAlert());
      } else {
        setNoti({
          color: 'success',
          message: 'Cập nhật thông tin thành công!',
        });
        dispatch(hideLoading());
        dispatch(showAlert());
      }
    }
  };
  const resetForm = () => {
    userApi.getUser().then(response => {
      const { data } = response;
      const usr = { ...response.data, birthday: new Date(data.birthday) };
      setUser(usr);
      setGender(usr.gender);
      setBirthday(usr.birthday);
      setAllowUpdate(true);
    });
  };
  const inputHandle = (e: any) => {
    setUser(() => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Card sx={{ minWidth: 275, padding: '30px' }}>
        <CardContent>
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            onSubmit={handleUpdate}
            autoComplete='off'>
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              marginBottom={5}>
              <Avatar
                src={user.avatar}
                alt={user.firstName}
                sx={{ width: '200px', height: '200px' }}
              />
            </Box>
            <Grid container display='flex'>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Tên tài khoản'
                value={user.username}
                disabled
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
                  disabled={allowUpdate}
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
                  disabled={allowUpdate}
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
                  disabled={allowUpdate}
                  label='Email'
                />
              </Grid>
              <Grid item md={6}>
                <TextField
                  name='phone'
                  variant='outlined'
                  required
                  value={user.phone}
                  onChange={inputHandle}
                  disabled={allowUpdate}
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
                  value={birthday}
                  maxDate={new Date()}
                  onChange={handleChange}
                  disabled={allowUpdate}
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
                    value={gender}
                    label='Giới tính'
                    sx={{ m: 1 }}
                    disabled={allowUpdate}
                    onChange={inputHandle}>
                    <MenuItem value='Male'>Nam</MenuItem>
                    <MenuItem value='Female'>Nữ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <CardActions>
              <Grid container justifyContent='center' spacing={3}>
                <Grid item>
                  <Button variant='contained' onClick={resetForm}>
                    Hủy
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant='contained' type='submit'>
                    Cập nhật
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Box>
        </CardContent>
        <SnackComponent {...noti} />
        <DialogComponent />
      </Card>
    </>
  );
};

export default UserInfoComponent;
