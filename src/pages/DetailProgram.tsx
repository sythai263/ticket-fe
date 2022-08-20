import { useAppDispatch } from 'app/hooks';
import DetailProgramComponent from 'components/DetailProgram';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailProgramPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(0));
  }, [dispatch]);
  return <DetailProgramComponent id={id} />;
};

export default DetailProgramPage;
