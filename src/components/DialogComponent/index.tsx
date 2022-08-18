import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from 'app/hooks';

const DialogComponent = () => {
  const noti = useAppSelector((state: any) => state.noti);
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
      open={noti.loading}>
      <CircularProgress />
    </Backdrop>
  );
};

export default DialogComponent;
