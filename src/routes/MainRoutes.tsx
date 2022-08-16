import PrivateRoutes from 'components/PrivateRoute';
import CheckInPage from 'pages/Admin/CheckIn';
import DashboardPage from 'pages/Admin/DashboardPage';
import AttendeesPage from 'pages/Admin/ListAttendeePage';
import ManageProgram from 'pages/Admin/ManageProgram';
import UpdateProgram from 'pages/Admin/UpdateProgram';
import DetailProgramPage from 'pages/DetailProgram';
import ListAttendeePage from 'pages/ListAttendee';
import Login from 'pages/Login';
import LoginWithGoogle from 'pages/LoginWithGoogle';
import PaymentSuccess from 'pages/PaymentSuccess';
import ProgramPage from 'pages/Programs';
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
          <Route path='tham-gia' element={<ListAttendeePage />} />
        </Route>
        <Route path='admin' element={<PrivateRoutes roleRequired='Admin' />}>
          <Route path='su-kien' element={<ManageProgram />} />
          <Route path='su-kien/:id' element={<AttendeesPage />} />
          <Route path='su-kien/chinh-sua/:id' element={<UpdateProgram />} />
          <Route path='tong-quan' element={<DashboardPage />} />
          <Route path='them-su-kien' element={<UserInfoPage />} />
          <Route path='check-in' element={<CheckInPage />} />
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
