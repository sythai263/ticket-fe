import { useAppDispatch } from 'app/hooks';
import UserInfoComponent from 'components/UserInfo';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const UserInfoPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(-1));
  });
  return <UserInfoComponent />;
};

export default UserInfoPage;
