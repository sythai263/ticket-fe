import { NavType } from 'constants/types/NavbarType';
import { RoleType } from 'constants/types/user/RoleEnum';
import { useAppSelector } from './hooks';

export const NavbarData = (): NavType[] => {
  const user = useAppSelector((state: any) => state.user);
  const role = user.current.role;
  const pages = [
    {
      id: 0,
      display: 'Sự kiện',
      slug: 'su-kien',
    },
    {
      id: 1,
      display: 'Quét mã',
      slug: 'nguoi-dung/qr-code',
    },
  ];
  if (user.isAuthentication) {
    pages.push({
      id: 3,
      display: 'DS Tham gia',
      slug: 'nguoi-dung/tham-gia',
    });
  }
  if (role === RoleType.ADMIN) {
    pages.push(
      {
        id: 4,
        display: 'Tổng quan',
        slug: 'admin/tong-quan',
      },
      {
        id: 5,
        display: 'QL Sự kiện',
        slug: 'admin/su-kien',
      },
      {
        id: 6,
        display: 'Check In',
        slug: 'admin/check-in',
      }
    );
  }
  return pages;
};
