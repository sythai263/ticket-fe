import { useAppDispatch } from 'app/hooks';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ListAttendee = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(3));
  });
  return <div>DetailRegister</div>;
};

export default ListAttendee;
