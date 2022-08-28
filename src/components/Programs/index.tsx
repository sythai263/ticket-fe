import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Card,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Pagination,
  TextField,
} from '@mui/material';
import { Container } from '@mui/system';
import programApi from 'api/program.api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import Program from 'components/Program';
import { ErrorType } from 'constants/types/notification/errorType';
import { OrderType } from 'constants/types/OrderType';
import { ProgramType } from 'constants/types/program/programType';
import QueryType from 'constants/types/queryType';
import {
  hideLoading,
  showAlert,
  showLoading,
} from 'features/notification/notiSlice';
import { useEffect, useState } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState(new Array<ProgramType>());
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<OrderType>(OrderType.DESC);
  const [count, setCount] = useState(1);
  const refresh = useAppSelector((state: any) => state.program.refresh);
  const [query, setQuery] = useState<QueryType>({
    take: 12,
    page,
    order,
  });
  const dispatch = useAppDispatch();

  const selectProgram = () => {
    dispatch(showLoading());
    programApi.getAll(query).then((response: AxiosResponse) => {
      setPrograms(response.data.data);
      setCount(response.data.meta.pageCount);
      dispatch(hideLoading());
    });
  };

  useEffect(() => {
    dispatch(showLoading());
    programApi
      .getAll(query)
      .then((response: AxiosResponse) => {
        setPrograms(response.data.data);
        setCount(response.data.meta.pageCount);
        dispatch(hideLoading());
      })
      .catch((error: AxiosError) => {
        dispatch(hideLoading());
        const data = error.response?.data as ErrorType;
        dispatch(showAlert({ color: 'error', message: data.message }));
      });
  }, [refresh, dispatch, query]);

  return (
    <>
      <Container>
        <Card sx={{ mb: 3 }}>
          <Grid
            container
            display='flex'
            flexDirection={{ md: 'column', lg: 'row' }}
            spacing={{ md: 1, lg: 2 }}
            justifyContent='center'
            margin={{ md: 1, lg: 2 }}>
            <Grid item md={6}>
              <TextField
                label='Từ khóa'
                sx={{ m: 1 }}
                value={query.keyword}
                onChange={(e: any) => {
                  setQuery({
                    ...query,
                    keyword: e.target.value,
                  });
                }}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={selectProgram}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                name='order'
                select
                value={query.order}
                label='Sắp xếp'
                sx={{ m: 1 }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const value = event.target.value as OrderType;
                  setOrder(value);
                  setQuery({
                    ...query,
                    order: value,
                  });
                }}>
                <MenuItem value='ASC'>Tăng dần</MenuItem>
                <MenuItem value='DESC'>Giảm dần</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>
        <Grid
          container
          spacing={2}
          alignItems='stretch'
          justifyContent='center'>
          {programs.map(program => (
            <Grid item xs={11} sm={5} md={3} lg={3} key={program.id}>
              <Program {...program} />
            </Grid>
          ))}
        </Grid>
        <Box py={3} display='flex' justifyContent='center'>
          <Pagination
            count={count}
            color='secondary'
            variant='outlined'
            onChange={(e, value) => {
              setPage(value);
              setQuery({
                ...query,
                page: value,
              });
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default Programs;
