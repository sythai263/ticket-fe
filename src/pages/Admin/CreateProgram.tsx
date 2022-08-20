import { useAppDispatch } from 'app/hooks';
import FormCreateProgram from 'components/Admin/FormProgram/FormCreateProgram';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const CreateProgramPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(5));
  });
  return <FormCreateProgram />;
};

export default CreateProgramPage;
