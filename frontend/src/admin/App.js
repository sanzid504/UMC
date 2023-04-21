import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminRoutes from './routes';

const AdminApp = () => {
  return (
    <div>
      <AdminRoutes />
    </div>
  );
};

export default AdminApp;
