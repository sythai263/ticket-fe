import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { BsAward } from 'react-icons/bs';

const InfoCheckIn = (props: { attendees: number; checkIn: number }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              CHECK IN
            </Typography>
            <Typography color='textPrimary' variant='h4' textAlign='center'>
              {props.checkIn} / {props.attendees}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'info.main',
                height: 56,
                width: 56,
              }}>
              <BsAward color='#ffffff' size={30} />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Typography
              color='info'
              sx={{
                mr: 1,
              }}
              variant='body2'>
              <Typography color='textSecondary' variant='caption'>
                {'Tỷ lệ '}
              </Typography>
              {((props.checkIn / props.attendees) * 100).toFixed(2)} %
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCheckIn;
