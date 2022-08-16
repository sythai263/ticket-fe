import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  const navigate = useNavigate();

  return (
    <Grid container>
      <Dialog open fullWidth>
        <DialogTitle>
          <Box display='flex' alignItems='center'>
            <Box>
              <IconButton>
                <DoneOutlineIcon color='success' />
              </IconButton>
            </Box>
            <Box flexGrow={1}>Thanh toán thành công</Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Đã thanh toán thành công!!!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'>
            <Button
              variant='contained'
              color='success'
              onClick={() => {
                navigate('/trang-chu');
              }}>
              Về trang chủ
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default PaymentSuccess;
