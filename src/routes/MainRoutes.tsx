import PrivateRoutes from 'components/PrivateRoute';
import CheckInPage from 'pages/Admin/CheckIn';
import CreateProgramPage from 'pages/Admin/CreateProgram';
import AttendeesPage from 'pages/Admin/ListAttendeePage';
import ManageProgram from 'pages/Admin/ManageProgram';
import UpdateProgram from 'pages/Admin/UpdateProgram';
import ChangePasswordPage from 'pages/ChangePasswordPage';
import DetailProgramPage from 'pages/DetailProgram';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';
import ListAttendeePage from 'pages/ListAttendee';
import Login from 'pages/Login';
import LoginWithGoogle from 'pages/LoginWithGoogle';
import PaymentSuccess from 'pages/PaymentSuccess';
import ProgramPage from 'pages/Programs';
import QRCodePage from 'pages/QRCode';
import SignUpPage from 'pages/SignUpPage';
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
          <Route path='doi-mat-khau' element={<ChangePasswordPage />} />
        </Route>
        <Route path='admin' element={<PrivateRoutes roleRequired='Admin' />}>
          <Route path='su-kien' element={<ManageProgram />} />
          <Route path='su-kien/:id' element={<AttendeesPage />} />
          <Route path='su-kien/chinh-sua/:id' element={<UpdateProgram />} />
          <Route path='them-su-kien' element={<CreateProgramPage />} />
          <Route path='check-in' element={<CheckInPage />} />
        </Route>
        <Route path='/' element={<Navigate to='trang-chu' />} />
        <Route path='/trang-chu' element={<ProgramPage />} />
        <Route path='/dang-nhap-voi-google' element={<LoginWithGoogle />} />
        <Route path='/dang-nhap' element={<Login />} />
        <Route path='/dang-ky' element={<SignUpPage />} />
        <Route path='/su-kien' element={<ProgramPage />} />
        <Route path='/su-kien/:id' element={<DetailProgramPage />} />
        <Route path='/da-thanh-toan' element={<PaymentSuccess />} />
        <Route path='/quen-mat-khau' element={<ForgotPasswordPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
