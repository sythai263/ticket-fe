import PrivateRoutes from 'components/PrivateRoute';
import DetailProgramPage from 'pages/DetailProgram';
import Login from 'pages/Login';
import LoginWithGoogle from 'pages/LoginWithGoogle';
import PaymentSuccess from 'pages/PaymentSuccsess';
import ProgramPage from 'pages/Products';
import QRCodePage from 'pages/QRCode';
import UserInfoPage from 'pages/UserInfo';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='nguoi-dung' element={<PrivateRoutes />}>
          <Route path='qr-code' element={<QRCodePage />} />
          <Route path='thong-tin' element={<UserInfoPage />} />
        </Route>
        <Route path='/' element={<Navigate to='trang-chu' />} />
        <Route path='/trang-chu' element={<ProgramPage />} />
        <Route path='/dang-nhap-voi-google' element={<LoginWithGoogle />} />
        <Route path='/dang-nhap' element={<Login />} />
        <Route path='/su-kien' element={<ProgramPage />} />
        <Route path='/su-kien/:id' element={<DetailProgramPage />} />

        <Route path='/da-thanh-toan' element={<PaymentSuccess />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
