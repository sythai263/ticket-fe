import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { ErrorType } from 'constants/types/errorType';
import { googleLogin } from 'features/login/userSlice';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const LoginWithGoogle = () => {
  const { search } = useLocation();
  const token = String(new URLSearchParams(search).get('token'));
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const fetchData = async () => {
    setOpenBackdrop(true);
    const result = await dispatch(googleLogin(token));
    if (result.meta.requestStatus === 'rejected') {
      const err = result.payload as ErrorType;
      const mess = String(err.message);
      setMessage(mess);
      setOpenDialog(true);
      setOpenBackdrop(false);
    } else {
      setOpenBackdrop(false);
      setSuccess(true);
    }
  };
  useEffect(() => {
    fetchData();
  });

  if (!token) {
    setMessage('Token không hợp lệ');
    setOpenDialog(true);
  }
  return (
    <Grid container>
      <Dialog open={openDialog} fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box>
              <IconButton>
                <ErrorOutlineIcon color='error' />
              </IconButton>
            </Box>
            <Box flexGrow={1}>LỖI ĐĂNG NHẬP</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFailure(true);
            }}>
            Đăng nhập lại
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
        open={openBackdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
      {failure && <Navigate to='/dang-nhap' />}
      {success && <Navigate to='/' />}
    </Grid>
  );
};

export default LoginWithGoogle;
