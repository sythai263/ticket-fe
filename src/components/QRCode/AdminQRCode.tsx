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
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { useState } from 'react';
import QrReader from 'react-qr-reader';
import api from '../../api/attendee.api';

const AdminQRCodeComponent = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState('No result');
  const [open, setOpen] = useState(false);
  const [attendeeID, setAttendeeID] = useState(-1);

  const handleClose = () => {
    setOpen(false);
  };

  async function attendee() {
    dispatch(showLoading());
    api
      .checkIn(Number(attendeeID))
      .then(() => {
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'success',
            message: 'Đã check-in thành công, mời bạn tham dự !',
          })
        );
        setOpen(false);
      })
      .catch((error: any) => {
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'error',
            message: String(error.response.data.message),
          })
        );
        setOpen(false);
      });
  }

  const handleScan = (data: any) => {
    if (data) {
      const prog = JSON.parse(data);
      const id = Number(prog.attendee);
      if (isNaN(id)) {
        dispatch(
          showAlert({ color: 'error', message: 'Mã QR không hợp lệ !' })
        );
      } else {
        setAttendeeID(id);
        setData(prog.name);
        setOpen(true);
      }
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
            {'Chào mừng bạn đã đến sự kiện'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {data}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button onClick={attendee} autoFocus>
              Check in
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default AdminQRCodeComponent;
