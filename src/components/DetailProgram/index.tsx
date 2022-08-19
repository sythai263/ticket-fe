import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  LinearProgress,
  Rating,
  Tab,
  TablePagination,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import api from 'api/review.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import ReviewCard from 'components/ReviewCard';
import { ErrorType } from 'constants/types/notification/errorType';
import { ProgramType } from 'constants/types/program/programType';
import QueryType from 'constants/types/queryType';
import { PaginationReview } from 'constants/types/review/paginationReview';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const DetailProgramComponent = (program: ProgramType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const items = [program.avatar, program.imageQR];
  const [value, setValue] = useState(0);
  const refresh = useAppSelector(state => state.program.refresh);
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

  const dispatch = useAppDispatch();
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}>
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    const id = program.id ? program.id : -1;
    api
      .getReview(id, query)
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
  }, [page, rowsPerPage, dispatch, refresh, program.id]);
  return (
    <Container>
      <Card>
        <CardHeader title={program.name} />
        <Grid container spacing={2} direction={isMobile ? 'column' : 'row'}>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Carousel>
              {items.map((item, index) => (
                <Grid
                  container
                  justifyContent='center'
                  alignItems='center'
                  key={index}>
                  <Grid item justifyContent='center' alignItems='center'>
                    <img
                      src={item}
                      style={{ height: '300px' }}
                      alt={program.name}
                    />
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Grid>
          <Grid item md={6} alignItems='center' justifyContent='center'>
            <Typography>{program.name}</Typography>
            <Grid item display='flex' flexDirection='row'>
              <Rating
                value={Number(program.starAvg)}
                readOnly
                precision={0.5}
              />
              <Typography marginLeft={5}>{program.starAvg}/5</Typography>
            </Grid>
            <Typography variant='h5' color='text.secondary' textAlign='right'>
              {`Phí: ${Number(program.price).toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}`}
            </Typography>
            <CardContent>
              <Box sx={{ width: '100%' }}>
                <LinearProgress variant='determinate' value={program.total} />
              </Box>
              <Typography
                variant='body2'
                color='text.secondary'
                textAlign='right'>
                {`Còn lại: ${program.remain}/${program.total}`}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Bắt đầu: ${moment(program.startDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {`Kết thúc: ${moment(program.endDate).format(
                  'HH:mm DD/MM/YYYY'
                )} `}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label='basic tabs example'>
              <Tab label='Mô tả' {...a11yProps(0)} />
              <Tab label='Đánh giá' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Typography>{program.description}</Typography>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={6} direction='column'>
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
            </Grid>
          </TabPanel>
        </Box>
      </Card>
    </Container>
  );
};

export default DetailProgramComponent;
