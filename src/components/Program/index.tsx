import CheckIcon from '@mui/icons-material/Check';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import api from 'api/attendee.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import SnackComponent from 'components/SnackComponent';
import { ErrorType } from 'constants/types/errorType';
import { ProgramType } from 'constants/types/productType';
import { SnackType } from 'constants/types/snackType';
import { showAlert } from 'features/notification/notiSlice';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Program = (program: ProgramType) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [noti, setNoti] = useState<SnackType>({ color: 'error', message: '' });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkAttendee = (id: number) => {
    api.getAttendee(id).then((response: AxiosResponse) => {
      const { data } = response;
      if (data.isRegister) {
        setProgress(Number(program.remain) / Number(program.total));
        setSuccess(true);
      }
    });
  };

  useEffect(() => {
    const id = Number(program.id);
    checkAttendee(id);
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    if (!loading) {
      if (!success) {
        setLoading(true);
        api
          .enroll(Number(program.id))
          .then((response: AxiosResponse) => {
            setNoti({ color: 'success', message: 'Đã đăng ký thành công !' });
            dispatch(showAlert());
          })
          .catch((err: AxiosError) => {
            const data = err.response?.data as ErrorType;
            if (err.response?.status === 401) {
              setOpen(true);
            } else {
              const mess = data.message;
              setNoti({ color: 'success', message: String(mess) });
              dispatch(showAlert());
            }
          });
      }
    }
  };

  return (
    <Card sx={{ maxWidth: 345, height: '100%' }}>
      <CardMedia
        component='img'
        height='140'
        image={program.avatar}
        alt={program.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {program.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {program.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant='determinate' value={progress} />
        </Box>
        <Typography variant='body2' color='text.secondary' textAlign='right'>
          {`Còn lại: ${program.remain}/${program.total}`}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {`Bắt đầu: ${moment(program.startDate).format('HH:mm DD/MM/YYYY')} `}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {`Kết thúc: ${moment(program.endDate).format('HH:mm DD/MM/YYYY')} `}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant='h5' color='text.secondary' textAlign='left'>
          {`Phí: ${Number(program.price).toLocaleString('vi', {
            style: 'currency',
            currency: 'VND',
          })}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' href={`/su-kien/${program.id}`}>
          Xem chi tiết
        </Button>
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
      </CardActions>
      <SnackComponent {...noti} />
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
    </Card>
  );
};

export default Program;
