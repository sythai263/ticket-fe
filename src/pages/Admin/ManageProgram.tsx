import { Container } from '@mui/material';
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
        <ListProgram />
      </Container>
    </>
  );
};

export default ManageProgram;
