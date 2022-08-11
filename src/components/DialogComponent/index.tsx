import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';

const DialogComponent = () => {
  const noti = useAppSelector((state: any) => state.noti);
  return (
    <Dialog open={noti.loading} fullWidth>
      <DialogTitle />
      <DialogContent>
        <Box display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogComponent;
