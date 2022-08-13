import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { SnackType } from 'constants/types/snackType';
import { hideAlert } from 'features/notification/notiSlice';

const SnackComponent = (props: SnackType) => {
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

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={noti.alert}
      autoHideDuration={3000}
      onClose={handleCloseSnack}>
      <Alert
        onClose={handleCloseSnack}
        sx={{ width: '100%' }}
        severity={props.color}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackComponent;
