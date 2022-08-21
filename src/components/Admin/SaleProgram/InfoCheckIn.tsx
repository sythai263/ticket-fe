import { Avatar, Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { BsAward } from 'react-icons/bs';

const InfoCheckIn = (props: { attendees: number; checkIn: number }) => {
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const p = props.checkIn / props.attendees;
    if (!isNaN(p)) {
      setPercent(Number((p * 100).toFixed(2)));
    }
  }, [props.attendees, props.checkIn]);
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
              {percent} %
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoCheckIn;
