import { Grid, TablePagination, Typography } from '@mui/material';
import api from 'api/review.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import ReviewCard from 'components/ReviewCard';
import { ErrorType } from 'constants/types/notification/errorType';
import QueryType from 'constants/types/queryType';
import { PaginationReview } from 'constants/types/review/paginationReview';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import React, { useEffect, useState } from 'react';

const ListReview = (props: { id: number }) => {
  const [reviews, setReviews] = useState<PaginationReview>({
    meta: {
      hasNextPage: false,
      hasPreviousPage: false,
      itemCount: 0,
      page: 1,
      pageCount: 0,
      take: 10,
    },
    data: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const refresh = useAppSelector(state => state.program.refresh);

  const dispatch = useAppDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(showLoading());
    const query = {
      page: page + 1,
      take: rowsPerPage,
      order: 'DESC',
    } as QueryType;

    api
      .getReview(props.id, query)
      .then((response: AxiosResponse) => {
        const data = response.data as PaginationReview;
        setReviews(data);
        dispatch(hideLoading());
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as ErrorType;
        dispatch(hideLoading());
        dispatch(showAlert({ color: 'error', message: data.message }));
      });
  }, [page, rowsPerPage, dispatch, refresh, props.id]);
  return (
    <>
      {reviews.data.length > 0 ? (
        reviews.data.map(review => (
          <Grid item key={review.id}>
            <ReviewCard {...review} />
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography>
            Hãy là người đầu tiên đánh giá chương trình này!
          </Typography>
        </Grid>
      )}
      <Grid item>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={reviews.meta.pageCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage='Số đánh giá / trang'
        />
      </Grid>
    </>
  );
};

export default ListReview;
