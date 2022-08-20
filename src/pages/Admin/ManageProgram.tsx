import { Button, Container, Grid } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import ListProgram from 'components/Admin/ListProgram';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ManageProgram = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(5));
  });
  return (
    <>
      <Container>
        <Grid container justifyContent='flex-end'>
          <Grid item>
            <Button variant='contained' href='/admin/them-su-kien'>
              Thêm sự kiện
            </Button>
          </Grid>
        </Grid>
        <ListProgram />
      </Container>
    </>
  );
};

export default ManageProgram;
