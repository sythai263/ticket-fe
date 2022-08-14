import { useAppDispatch } from 'app/hooks';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';
import LoginComponent from '../components/Login';

const Login = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  return (
    <>
      <LoginComponent />
    </>
  );
};

export default Login;
