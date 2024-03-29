import { useAppDispatch } from 'app/hooks';
import CardDashboard from 'components/Admin/CardDashboard';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(4));
  });
  return <CardDashboard />;
};

export default DashboardPage;
