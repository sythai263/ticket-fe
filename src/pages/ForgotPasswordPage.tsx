import { useAppDispatch } from 'app/hooks';
import ForgotPasswordComponent from 'components/ForgotPassword';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  return (
    <>
      <ForgotPasswordComponent />
    </>
  );
};

export default ForgotPasswordPage;
