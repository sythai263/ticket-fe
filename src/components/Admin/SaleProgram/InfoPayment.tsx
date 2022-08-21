import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BiMoney } from 'react-icons/bi';

const InfoPayment = (props: { sum: number; paid: number }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              NHẬN THANH TOÁN
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              {props.paid.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56,
              }}>
              <BiMoney color='#ffffff' size={28} />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Typography
            color='error'
            sx={{
              mr: 1,
            }}
            variant='body2'>
            <Typography color='textSecondary' variant='caption'>
              {'Chưa thanh toán '}
            </Typography>
            {(props.sum - props.paid).toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoPayment;
