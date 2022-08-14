import { useAppDispatch } from 'app/hooks';
import Programs from 'components/Programs';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ProgramPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(0));
  });
  return (
    <>
      <Programs />
    </>
  );
};

export default ProgramPage;
