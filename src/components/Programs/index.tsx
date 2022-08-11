import { CircularProgress, Grid } from '@mui/material';
import { Container } from '@mui/system';
import programApi from 'api/program.api';
import Program from 'components/Program';
import { ProgramType } from 'constants/types/productType';
import { useEffect, useState } from 'react';

const Programs = () => {
  const [programs, setPrograms] = useState(new Array<ProgramType>());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    programApi.getAll().then((response: any) => {
      setPrograms(response.data.data);
      setLoading(false);
    });
  }, []);
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
      </Container>
    </>
  );
};

export default Programs;
