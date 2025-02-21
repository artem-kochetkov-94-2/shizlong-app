import { Navigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Map } from '@presentation/components/Map';
import { Routes } from '@src/routes';

export const Home = () => {
  const isHome = useLocation().pathname === Routes.Home;

  return (
    <>
      <Map />
      <Outlet />
      {isHome && <Navigate to={Routes.Beaches} />}
    </>
  );
}
