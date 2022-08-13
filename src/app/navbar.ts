import { NavType } from 'constants/types/NavbarType';
import { RoleType } from 'constants/types/RoleEnum';
import { useAppSelector } from './hooks';

export const NavbarData = (): NavType[] => {
  const user = useAppSelector((state: any) => state.user);
  const role = user.current.role;
  const pages = [
    {
      display: 'Sự kiện',
      slug: 'su-kien',
    },
    {
      display: 'Quét mã',
      slug: 'nguoi-dung/qr-code',
    },
  ];
  if (role === RoleType.ADMIN) {
    pages.push(
      {
        display: 'Tổng quan',
        slug: 'admin/tong-quan',
      },
      {
        display: 'QL Sự kiện',
        slug: 'admin/su-kien',
      },
      {
        display: 'Check In',
        slug: 'admin/check-in',
      }
    );
  }
  return pages;
};
