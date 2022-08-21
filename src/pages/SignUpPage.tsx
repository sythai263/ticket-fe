import { useAppDispatch } from 'app/hooks';
import SignUpComponent from 'components/SignUpComponent';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  return (
    <>
      <SignUpComponent />
    </>
  );
};

export default SignUpPage;
