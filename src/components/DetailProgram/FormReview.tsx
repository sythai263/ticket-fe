import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Rating,
  TextField,
} from '@mui/material';
import api from 'api/review.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import { CreateReview } from 'constants/types/review/createReview';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { refreshList } from 'features/program/programSlice';
import { useState } from 'react';

const FormReview = (props: { id: number }) => {
  const init = { programId: props.id, comment: '', star: 5 } as CreateReview;
  const [review, setReview] = useState<CreateReview>(init);
  const dispatch = useAppDispatch();
  const inputHandle = (e: any) => {
    setReview(() => ({
      ...review,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCancel = () => {
    setReview(init);
  };
  const handlePostReview = () => {
    dispatch(showLoading());
    api
      .createReview(review)
      .then((response: AxiosResponse) => {
        dispatch(hideLoading());
        dispatch(refreshList());
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorType;
        dispatch(hideLoading());
        dispatch(showAlert({ color: 'error', message: data.message }));
      });
  };
  return (
    <Card>
      <CardHeader title='Đánh giá sự kiện này...' />
      <CardContent>
        <Grid container spacing={3} direction='column'>
          <Grid item>
            <TextField
              name='comment'
              variant='outlined'
              label='Nội dung'
              fullWidth
              multiline
              value={review.comment}
              onChange={inputHandle}
            />
          </Grid>
          <Grid item>
            <Box display='flex' justifyContent='center'>
              <Rating
                value={review.star}
                onChange={(event, newValue) => {
                  setReview({
                    ...review,
                    star: Number(newValue),
                  });
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container justifyContent='flex-end'>
          <Button onClick={handleCancel}>Hủy</Button>
          <Button variant='contained' onClick={handlePostReview}>
            Đăng
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default FormReview;
