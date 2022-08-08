import { Navigate, Outlet } from 'react-router-dom';
type PrivateRouteType = {
  roleRequired?: 'Admin' | 'User';
};

const useAuth = () => {
  const _user = localStorage.getItem('user');
  let user: any;
  if (_user) {
    user = JSON.parse(_user);
  }

  if (user) {
    return {
      auth: true,
      role: user.role,
    };
  } else {
    return {
      auth: false,
      role: null,
    };
  }
};
const PrivateRoutes = (props: PrivateRouteType) => {
  const { auth, role } = useAuth();

  //if the role required is there or not
  if (props.roleRequired) {
    return auth ? (
      props.roleRequired === role ? (
        <Outlet />
      ) : (
        <Navigate to='/403' />
      )
    ) : (
      <Navigate to='/dang-nhap' />
    );
  } else {
    return auth ? <Outlet /> : <Navigate to='/dang-nhap' />;
  }
};

export default PrivateRoutes;
