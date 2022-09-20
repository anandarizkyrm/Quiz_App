import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface props {
  user: string | boolean;
  redirectPath: string;
  children: React.ReactNode;
}

const ProtectedRoute = ({
  user,
  redirectPath = '/login',
  children,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
Partial<props>): any => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
