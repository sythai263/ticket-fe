import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { hideAlert } from 'features/notification/notiSlice';
import { useEffect } from 'react';

const SnackComponent = () => {
  const noti = useAppSelector((state: any) => state.noti);
  const dispatch = useAppDispatch();

  const handleCloseSnack = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(hideAlert());
  };
  useEffect(() => {
    dispatch(hideAlert());
  }, [dispatch]);
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={noti.alert}
      autoHideDuration={3000}
      onClose={handleCloseSnack}>
      <Alert
        onClose={handleCloseSnack}
        sx={{ width: '100%' }}
        severity={noti.data.color}>
        {noti.data.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackComponent;
