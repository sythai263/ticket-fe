import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import api from '../../api/attendee.api';

const QRCodeComponent = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState('No result');
  const [open, setOpen] = useState(false);
  const [program, setProgram] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  async function attendee() {
    dispatch(showLoading());
    api
      .enroll(Number(program))
      .then((response: AxiosResponse) => {
        dispatch(hideLoading());
        const data = response?.data as ErrorType;
        dispatch(showAlert({ color: 'success', message: data.message }));
        setOpen(false);
      })
      .catch((error: AxiosError) => {
        dispatch(hideLoading());
        const data = error.response?.data as ErrorType;
        dispatch(
          showAlert({
            color: 'error',
            message: data.message,
          })
        );
        setOpen(false);
      });
  }

  const handleScan = (data: any) => {
    if (data) {
      const prog = JSON.parse(data);
      setProgram(prog.program);
      setData(prog.name);
      setOpen(true);
    }
  };
  const handleError = (error: any) => {};

  return (
    <>
      <Box
        sx={{
          width: 400,
          height: 400,
        }}>
        <QrReader delay={300} onError={handleError} onScan={handleScan} />

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'>
          <DialogTitle id='alert-dialog-title'>
            {'Bạn chắc chắn muốn đăng ký chương trình này không ?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {data}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={attendee} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default QRCodeComponent;
