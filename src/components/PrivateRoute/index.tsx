import { useAppSelector } from 'app/hooks';
import { Navigate, Outlet } from 'react-router-dom';
type PrivateRouteType = {
  roleRequired?: 'Admin' | 'User';
};

const useAuth = () => {
  const user = useAppSelector((state: any) => state.user);
  return {
    auth: user.isAuthentication,
    role: user.current.role,
  };
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
