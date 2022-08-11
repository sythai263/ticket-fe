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
import DialogComponent from 'components/DialogComponent';
import SnackComponent from 'components/SnackComponent';
import { SnackType } from 'constants/types/snackType';
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
  const [noti, setNoti] = useState<SnackType>({ color: 'error', message: '' });

  const handleClose = () => {
    setOpen(false);
  };

  async function attendee() {
    dispatch(showLoading());
    try {
      await api.enroll(Number(program));
      setNoti({ color: 'success', message: 'Đã đăng ký thành công !' });
      dispatch(hideLoading());
      dispatch(showAlert());
    } catch (error: any) {
      setNoti({
        color: 'error',
        message: String(error.response.data.message),
      });
      dispatch(hideLoading());
      dispatch(showAlert());
    }
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
        <SnackComponent {...noti} />
        <DialogComponent />
      </Box>
    </>
  );
};

export default QRCodeComponent;
