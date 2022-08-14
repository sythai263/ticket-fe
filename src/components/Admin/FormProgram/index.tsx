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
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import DialogComponent from 'components/DialogComponent';
import SnackComponent from 'components/SnackComponent';
import { IdType } from 'constants/types/idType';
import { ErrorType } from 'constants/types/notification/errorType';
import { SnackType } from 'constants/types/notification/snackType';
import { ProgramType } from 'constants/types/program/programType';
import { UpdateProgram } from 'constants/types/program/updateProgram';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';

const FormUpdateProgram = (id: IdType) => {
  const [program, setProgram] = useState<ProgramType>({});
  const [reset, setReset] = useState(false);
  const [noti, setNoti] = useState<SnackType>({ color: 'error', message: '' });
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    dispatch(showLoading());
    api
      .getDetail(id.id)
      .then((response: AxiosResponse) => {
        const data = response.data as ProgramType;
        setProgram(data);
        dispatch(hideLoading());
      })
      .catch(err => {
        dispatch(hideLoading());
      });
  }, [id.id, reset, dispatch]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());

    const info = {
      id: id.id,
      description: program.description,
      endDate: program.endDate,
      name: program.name,
      price: Number(program.price),
      startDate: program.startDate,
      total: Number(program.total),
      place: program.place,
    } as UpdateProgram;
    dispatch(hideLoading());

    api
      .updateProgram(info)
      .then((response: AxiosResponse) => {
        setNoti({
          color: 'success',
          message: 'Cập nhật thông tin thành công!',
        });
        dispatch(hideLoading());
        dispatch(showAlert());
      })
      .catch((error: AxiosError) => {
        const err = error.response?.data as ErrorType;
        const mess = String(err.message);
        setNoti({ color: 'error', message: mess });
        dispatch(hideLoading());
        dispatch(showAlert());
      });
  };

  const inputHandle = (e: any) => {
    setProgram(() => ({
      ...program,
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
                src={program.avatar}
                alt={program.name}
                sx={{ width: '200px', height: '200px' }}
              />
            </Box>
            <Grid container display='flex'>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='name'
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
                id='name'
                label='Địa điểm'
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
                    program.startDate = moment(date).toDate();
                  }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name='startDate'
                      variant='outlined'
                    />
                  )}
                />
              </Grid>
              <Grid item md={6}>
                <DateTimePicker
                  disablePast
                  label='Kết thúc'
                  value={program.endDate}
                  onChange={(date: Date | null) => {
                    program.endDate = moment(date).toDate();
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
                id='description'
                label='Mô tả'
                value={program.description}
              />
            </Grid>
            <CardActions>
              <Grid container justifyContent='center' spacing={3}>
                <Grid item>
                  <Button variant='contained' onClick={() => setReset(!reset)}>
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

export default FormUpdateProgram;
