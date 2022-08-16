import { useAppDispatch } from 'app/hooks';
import ListAttendeeComponent from 'components/ListAttendee';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const ListAttendeePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(3));
  });
  return <ListAttendeeComponent />;
};

export default ListAttendeePage;
