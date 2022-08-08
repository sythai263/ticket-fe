import {
  Alert,
  AlertColor,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import api from '../../api/attendee.api';

const QRCodeComponent = () => {
  const [data, setData] = useState('No result');
  const [mount, setMount] = useState(true);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [typeNoti, setTypeNoti] = useState<AlertColor>('success');
  const [message, setMessage] = useState('');
  const [program, setProgram] = useState();

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  useEffect(() => {}, [data]);

  const handleClose = () => {
    setOpen(false);
  };

  async function attendee() {
    try {
      const response = await api.enroll(Number(program));
      const { data } = response;
      setMessage('Đã đăng ký thành công !');
      setTypeNoti('success');
      setOpenSnack(true);
      setOpen(false);
    } catch (error: any) {
      setMessage(String(error.response.data.message));
      setTypeNoti('error');
      setOpenSnack(true);
      setOpen(false);
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
        {mount && (
          <QrReader delay={300} onError={handleError} onScan={handleScan} />
        )}
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
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleCloseSnack}>
          <Alert
            onClose={handleCloseSnack}
            sx={{ width: '100%' }}
            severity={typeNoti}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default QRCodeComponent;
