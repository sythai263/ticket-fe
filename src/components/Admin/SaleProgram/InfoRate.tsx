import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { BsAward } from 'react-icons/bs';

const InfoRate = (props: { avgStar: number; amountRate: number }) => {
  return (
    <Card sx={{ width: '100%', height: '100%' }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color='textSecondary' gutterBottom variant='overline'>
              ĐÁNH GIÁ
            </Typography>
            <Typography color='textPrimary' variant='h4'>
              {props.avgStar} / 5
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'warning.main',
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
            flexDirection: 'column',
          }}>
          <Rating value={props.avgStar} precision={0.5} readOnly />
          <Typography
            color='info'
            sx={{
              mr: 1,
            }}
            variant='body2'>
            <Typography color='textSecondary' variant='caption'>
              {'Trong tổng số '}
            </Typography>
            {props.amountRate} đánh giá
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InfoRate;
