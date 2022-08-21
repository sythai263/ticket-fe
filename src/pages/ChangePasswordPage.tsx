import { useAppDispatch } from 'app/hooks';
import ChangePasswordComponent from 'components/ChangePassword';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ChangePasswordPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  return (
    <>
      <ChangePasswordComponent />
    </>
  );
};

export default ChangePasswordPage;
