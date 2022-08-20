import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import api from 'api/program.api';
import apiUpload from 'api/upload.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ImageType } from 'constants/types/image/imageType';
import { ErrorType } from 'constants/types/notification/errorType';
import { CreateProgram } from 'constants/types/program/createProgram';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { refreshList } from 'features/program/programSlice';
import moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormCreateProgram = () => {
  const init = {
    avatar: '',
    description: '',
    name: '',
    price: 0,
    place: '',
    total: 1,
    startDate: new Date(),
    endDate: new Date(),
  } as CreateProgram;
  const [program, setProgram] = useState<CreateProgram>(init);
  const [reset, setReset] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState('');
  const [file, setFile] = useState();
  const [isSelect, setSelect] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleSelect = (e: any) => {
    setSelect(true);
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleCancel = () => {
    setSelect(false);
    setAvatar('');
  };

  const handleUpload = () => {
    dispatch(showLoading());
    if (!file) {
      dispatch(hideLoading());
      dispatch(showAlert({ color: 'error', message: 'Vui lòng chọn ảnh !' }));
    } else {
      apiUpload
        .uploadImage(file, 'programs')
        .then((response: AxiosResponse) => {
          const image = response.data as ImageType;
          const url = process.env.REACT_APP_API_URL
            ? process.env.REACT_APP_API_URL
            : '';
          setAvatar(url + image.url);
          setProgram({
            ...program,
            avatar: image.url,
          });
          setSelect(false);
          dispatch(hideLoading());
          dispatch(
            showAlert({ color: 'success', message: 'Đã tải lên thành công !' })
          );
        })
        .catch((err: AxiosError) => {
          const data = err.response?.data as ErrorType;
          dispatch(hideLoading());
          dispatch(showAlert({ color: 'error', message: data.message }));
        });
    }
  };

  const handleCreate = (e: any) => {
    e.preventDefault();
    dispatch(showLoading());
    const info = {
      ...program,
      price: Number(program.price),
      total: Number(program.total),
    } as CreateProgram;
    api
      .createProgram(info)
      .then((response: AxiosResponse) => {
        dispatch(hideLoading());
        dispatch(refreshList());
        dispatch(
          showAlert({
            color: 'success',
            message: 'Tạo sự kiện thành công!',
          })
        );
      })
      .catch((error: AxiosError) => {
        const err = error.response?.data as ErrorType;
        const mess = String(err.message);
        dispatch(hideLoading());
        dispatch(showAlert({ color: 'error', message: mess }));
      });
  };

  const inputHandle = (e: any) => {
    setProgram(() => ({
      ...program,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Card sx={{ minWidth: 275, padding: '30px' }}>
      <CardContent>
        <Box
          component='form'
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          onSubmit={handleCreate}
          autoComplete='off'>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            marginBottom={5}>
            <Avatar
              src={avatar}
              alt={avatar}
              sx={{ width: '200px', height: '200px', marginBottom: '20px' }}
            />
            <Grid container spacing={3} justifyContent='center'>
              {isSelect ? (
                <>
                  <Grid item>
                    <Button variant='contained' onClick={handleUpload}>
                      Tải lên
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleCancel}>Hủy</Button>
                  </Grid>
                </>
              ) : (
                <Grid item>
                  <Button variant='contained' component='label'>
                    Chọn ảnh
                    <input
                      type='file'
                      hidden
                      onChange={handleSelect}
                      name='avatar'
                      accept='image/*'
                    />
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
          <Grid container display='flex'>
            <TextField
              variant='outlined'
              required
              fullWidth
              onChange={inputHandle}
              name='name'
              label='Tên sự kiện'
              value={program.name}
            />
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <TextField
                name='total'
                variant='outlined'
                type='number'
                required
                value={program.total}
                onChange={inputHandle}
                label='Số lượng'
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name='price'
                variant='outlined'
                required
                type='number'
                value={program.price}
                onChange={inputHandle}
                label='Giá'
              />
            </Grid>
          </Grid>
          <Grid container display='flex'>
            <TextField
              variant='outlined'
              required
              fullWidth
              name='place'
              label='Địa điểm'
              onChange={inputHandle}
              value={program.place}
            />
          </Grid>
          <Grid
            container
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}>
            <Grid item md={6}>
              <DateTimePicker
                disablePast
                label='Bắt đầu'
                value={program.startDate}
                onChange={(date: Date | null) => {
                  setProgram({
                    ...program,
                    startDate: moment(date).toDate(),
                  });
                }}
                renderInput={params => (
                  <TextField {...params} name='startDate' variant='outlined' />
                )}
              />
            </Grid>
            <Grid item md={6}>
              <DateTimePicker
                disablePast
                label='Kết thúc'
                value={program.endDate}
                onChange={(date: Date | null) => {
                  setProgram({
                    ...program,
                    endDate: moment(date).toDate(),
                  });
                }}
                renderInput={params => (
                  <TextField {...params} name='endDate' variant='outlined' />
                )}
              />
            </Grid>
          </Grid>
          <Grid container display='flex'>
            <TextField
              variant='outlined'
              required
              fullWidth
              multiline
              name='description'
              label='Mô tả'
              onChange={inputHandle}
              value={program.description}
            />
          </Grid>
          <CardActions>
            <Grid container justifyContent='center' spacing={3}>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={() => {
                    setReset(!reset);
                    navigate('/admin/su-kien');
                  }}>
                  Hủy
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' type='submit'>
                  Tạo mới
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCreateProgram;
