import React from 'react';
import { Outlet } from 'react-router-dom';

export const LayoutMain = (): JSX.Element => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};
