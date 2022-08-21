import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FaPercent } from 'react-icons/fa';

const InfoRegister = (props: { total: number; attendees: number }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              ĐÃ ĐĂNG KÝ
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              {props.attendees}/{props.total}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'error.main',
                height: 56,
                width: 56,
              }}>
              <FaPercent color='#ffffff' />
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
              {'Còn lại '}
            </Typography>
            {props.total - props.attendees} slot
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoRegister;
