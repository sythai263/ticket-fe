import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Typography,
} from '@mui/material';
import { Review } from 'constants/types/reviewType';
import moment from 'moment';

const ReviewCard = (review: Review) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            src={review.user?.avatar}
            aria-label={review.user?.firstName}
          />
        }
        title={`${review.user?.lastName} ${review.user?.firstName}`}
        subheader={moment(review.create).format('DD/MM/YYYY')}
      />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {review.comment}
        </Typography>
        <Rating value={review.star} readOnly precision={0.5} />
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
