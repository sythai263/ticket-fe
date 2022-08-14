import { useAppDispatch } from 'app/hooks';
import FormUpdateProgram from 'components/Admin/FormProgram';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProgram = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = Number(params.id);
  useEffect(() => {
    dispatch(setActive(5));
  });
  return <FormUpdateProgram id={id} />;
};

export default SingleProgram;
