import { useAppDispatch } from 'app/hooks';
import ListAttendeeComponent from 'components/Admin/ListAttendee';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AttendeesPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(5));
  });
  return <ListAttendeeComponent id={id} />;
};

export default AttendeesPage;
