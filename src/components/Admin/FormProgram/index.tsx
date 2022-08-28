import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import api from 'api/program.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import { ProgramType } from 'constants/types/program/programType';
import { UpdateProgram } from 'constants/types/program/updateProgram';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormUpdateProgram = (props: { id: number }) => {
  const [program, setProgram] = useState<ProgramType>({
    description: '',
    name: '',
    price: 0,
    place: '',
    total: 0,
  });
  const [checked, setChecked] = useState(false);
  const [reset, setReset] = useState(false);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    dispatch(showLoading());
    api
      .getDetail(props.id)
      .then((response: AxiosResponse) => {
        const data = response.data as ProgramType;
        setProgram(data);
        setChecked(Boolean(program.allowCheckIn));
        dispatch(hideLoading());
      })
      .catch(err => {
        dispatch(hideLoading());
      });
  }, [props.id, reset, dispatch, program.allowCheckIn]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    dispatch(showLoading());

    const info = {
      id: props.id,
      description: program.description,
      endDate: program.endDate,
      name: program.name,
      price: Number(program.price),
      startDate: program.startDate,
      total: Number(program.total),
      place: program.place,
    } as UpdateProgram;

    api
      .updateProgram(info)
      .then((response: AxiosResponse) => {
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'success',
            message: 'Cập nhật thông tin thành công!',
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

  const handleChangeStatus = () => {
    dispatch(showLoading());
    api
      .changeStatus(props.id)
      .then((response: AxiosResponse) => {
        const data = response.data as ProgramType;
        setProgram(data);
        setChecked(Boolean(program.allowCheckIn));
        dispatch(
          showAlert({
            color: 'success',
            message: 'Đã thay đổi trạng thái check in !',
          })
        );
        dispatch(hideLoading());
      })
      .catch((err: AxiosError) => {
        setChecked(false);
        const data = err.response?.data as ErrorType;
        const mess = data.message;
        setChecked(Boolean(program.allowCheckIn));
        dispatch(showAlert({ color: 'error', message: String(mess) }));
        dispatch(hideLoading());
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
              <FormGroup>
                <FormControlLabel
                  labelPlacement='start'
                  control={
                    <Switch checked={checked} onChange={handleChangeStatus} />
                  }
                  label='Cho phép check in'
                />
              </FormGroup>
            </Grid>
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
                    Cập nhật
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default FormUpdateProgram;
