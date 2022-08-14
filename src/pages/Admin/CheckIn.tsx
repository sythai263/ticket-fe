import { useAppDispatch } from 'app/hooks';
import AdminQRCodeComponent from 'components/QRCode/AdminQRCode';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const CheckInPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(6));
  });
  return <AdminQRCodeComponent />;
};

export default CheckInPage;
