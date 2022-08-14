import { useAppDispatch } from 'app/hooks';
import QRCodeComponent from 'components/QRCode';
import { setActive } from 'features/navbar/navbarSlice';
import { useEffect } from 'react';

const QRCodePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActive(1));
  });
  return <QRCodeComponent />;
};

export default QRCodePage;
