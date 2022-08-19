import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import api from 'api/review.api';
import { useAppDispatch } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorType } from 'constants/types/notification/errorType';
import { Review } from 'constants/types/review/reviewType';
import { UpdateReview } from 'constants/types/review/updateReview';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { refreshList } from 'features/program/programSlice';
import moment from 'moment';
import { useState } from 'react';

const ReviewCard = (review: Review) => {
  const initial = {
    id: review.id ? review.id : -1,
    comment: review.comment,
    star: review.star,
  };
  const [edit, setEdit] = useState(false);
  const [updateReview, setUpdateReview] = useState<UpdateReview>(initial);
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState('Sửa');
  const dispatch = useAppDispatch();

  const inputHandle = (e: any) => {
    setUpdateReview(() => ({
      ...updateReview,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    dispatch(showLoading());
    if (action === 'Sửa') {
      setEdit(true);
      setAction('Cập nhật');
      dispatch(hideLoading());
    } else if (action === 'Cập nhật') {
      api
        .updateReview(updateReview)
        .then((response: AxiosResponse) => {
          setEdit(false);
          setAction('Sửa');
          dispatch(hideLoading());
          dispatch(
            showAlert({
              color: 'success',
              message: 'Đã cập nhật đánh giá của bạn!',
            })
          );
          dispatch(refreshList());
        })
        .catch((err: AxiosError) => {
          const data = err.response?.data as ErrorType;
          dispatch(hideLoading());
          dispatch(
            showAlert({
              color: 'error',
              message: data.message,
            })
          );
        });
    }
  };

  const handleDelete = () => {
    dispatch(showLoading());
    api
      .deleteReview(updateReview.id)
      .then((response: AxiosResponse) => {
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'success',
            message: 'Đã xóa đánh giá của bạn!',
          })
        );
        dispatch(refreshList());
      })
      .catch((err: AxiosError) => {
        const data = err.response?.data as ErrorType;
        dispatch(hideLoading());
        dispatch(
          showAlert({
            color: 'error',
            message: data.message,
          })
        );
      });
  };
  const handleReset = () => {
    setUpdateReview(initial);
    setEdit(false);
    setAction('Sửa');
  };
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
        subheader={moment(review.createAt).format('DD/MM/YYYY')}
      />
      <CardContent>
        {review.canUpdate ? (
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <TextField
                name='comment'
                variant='outlined'
                required
                fullWidth
                value={updateReview.comment}
                onChange={inputHandle}
                disabled={!edit}
              />
            </Grid>
            <Grid item>
              <Rating
                value={updateReview.star}
                readOnly={!edit}
                onChange={(event, newValue) => {
                  setUpdateReview({
                    ...updateReview,
                    star: Number(newValue),
                  });
                }}
              />
            </Grid>
            <CardActions>
              <Button
                onClick={handleUpdate}
                variant={action === 'Sửa' ? 'text' : 'contained'}>
                {action}
              </Button>
              {edit && (
                <Button onClick={handleReset} variant='contained'>
                  Hủy
                </Button>
              )}
              <Button onClick={() => setOpenDialog(true)}>Xóa</Button>
            </CardActions>
          </Grid>
        ) : (
          <>
            <Typography color='inherit'>{review.comment}</Typography>
            <Rating value={review.star} readOnly />
          </>
        )}
      </CardContent>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Bạn chắc chắn muốn xóa ???'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Cân nhắc trước khi xóa nha !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
            }}>
            Hủy
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Chắc chắn
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ReviewCard;
