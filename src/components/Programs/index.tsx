import { Box, CircularProgress, Grid, Pagination } from '@mui/material';
import { Container } from '@mui/system';
import programApi from 'api/program.api';
import { useAppSelector } from 'app/hooks';
import { AxiosResponse } from 'axios';
import Program from 'components/Program';
import { ProgramType } from 'constants/types/program/programType';
import QueryType from 'constants/types/queryType';
import { useEffect, useState } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState(new Array<ProgramType>());
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const refresh = useAppSelector((state: any) => state.program.refresh);

  useEffect(() => {
    const query = { page: page, take: 12, order: 'DESC' } as QueryType;
    programApi.getAll(query).then((response: AxiosResponse) => {
      setPrograms(response.data.data);
      setCount(response.data.meta.pageCount);
      setLoading(false);
    });
  }, [page, refresh]);
  return (
    <>
      <Container>
        <Grid
          container
          spacing={2}
          alignItems='stretch'
          justifyContent='center'>
          {loading && <CircularProgress />}
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
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Container>
    </>
  );
};

export default Programs;
