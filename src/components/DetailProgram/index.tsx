import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  LinearProgress,
  Rating,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import attendeeApi from 'api/attendee.api';
import api from 'api/program.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import { ProgramType } from 'constants/types/program/programType';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { refreshList } from 'features/program/programSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { useNavigate } from 'react-router-dom';
import FormReview from './FormReview';
import ListReview from './ListReview';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const DetailProgramComponent = (props: { id: number }) => {
  const theme = useTheme();
  const init = {
    allowCheckIn: false,
    id: -1,
    avatar: '',
    description: '',
    endDate: new Date(),
    startDate: new Date(),
    starAvg: 5,
    imageQR: '',
    name: '',
    place: '',
    price: 0,
    remain: 0,
    total: 0,
  } as ProgramType;
  const [program, setProgram] = useState<ProgramType>(init);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const items = [program.avatar, program.imageQR];
  const [value, setValue] = useState(0);
  const refresh = useAppSelector(state => state.program.refresh);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    if (!loading) {
      if (!success) {
        setLoading(true);
        attendeeApi
          .enroll(Number(program.id))
          .then((response: AxiosResponse) => {
            dispatch(refreshList());
            dispatch(
              showAlert({
                color: 'success',
                message: 'Đã đăng ký thành công !',
              })
            );
            setSuccess(true);
            setLoading(false);
          })
          .catch((err: AxiosError) => {
            const data = err.response?.data as ErrorType;
            if (err.response?.status === 401) {
              setOpen(true);
            } else {
              const mess = data.message;
              dispatch(showAlert({ color: 'error', message: String(mess) }));
            }
            setLoading(false);
          });
      }
    }
  };

  const dispatch = useAppDispatch();
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(showLoading());
    api
      .getDetail(props.id)
      .then((response: AxiosResponse) => {
        const data = response.data as ProgramType;
        setProgram(data);
        setSuccess(Boolean(program.isRegister));
        dispatch(hideLoading());
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as ErrorType;
        dispatch(showAlert({ color: 'error', message: data.message }));
        dispatch(hideLoading());
      });
  }, [props.id, dispatch, refresh, program.isRegister]);

  return (
    <Container>
      <Card>
        <CardHeader title={program.name} />
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Carousel>
              {items.map((item, index) => (
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  key={index}>
                  <Grid item justifyContent='center' alignItems='center'>
                    <img
                      src={item}
                      style={{ height: '300px' }}
                      alt={program.name}
                    />
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Typography>{program.name}</Typography>
            <Grid item display='flex' flexDirection='row'>
              <Rating
                value={Number(program.starAvg)}
                readOnly
                precision={0.5}
              />
              <Typography marginLeft={5}>{program.starAvg}/5</Typography>
            </Grid>
            <Typography variant='h5' color='text.secondary' textAlign='right'>
              {`Phí: ${Number(program.price).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}`}
            </Typography>
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <LinearProgress
                  variant='determinate'
                  value={Number(program.remain) / Number(program.total)}
                />
              </Box>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='right'>
                {`Còn lại: ${program.remain}/${program.total}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Bắt đầu: ${moment(program.startDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Kết thúc: ${moment(program.endDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container>
                <Grid item>
                  <Box display='flex'>
                    <Box sx={{ m: 1, position: 'relative' }}>
                      <Button
                        variant='contained'
                        disabled={loading}
                        color={success ? 'success' : 'primary'}
                        onClick={handleButtonClick}>
                        {success ? <CheckIcon /> : 'Tham gia'}
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'>
              <Tab label='Mô tả' {...a11yProps(0)} />
              <Tab label='Đánh giá' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography>{program.description}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={6} direction='column'>
              <Grid item>
                <FormReview id={program.id ? program.id : -1} />
              </Grid>
              <Grid item>
                <ListReview id={program.id ? program.id : -1} />
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Bạn chưa đăng nhập !'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Hãn đăng nhập để tham gia chương trình này !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() => {
              navigate('/dang-nhap', { replace: true });
            }}
            autoFocus>
            Đăng nhập
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DetailProgramComponent;
