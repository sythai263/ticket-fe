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
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [back, setBack] = useState(false);

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
                setBack(true);
              }}>
              Về trang chủ
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      {back && <Navigate to='/trang-chu' />}
    </Grid>
  );
};

export default PaymentSuccess;
