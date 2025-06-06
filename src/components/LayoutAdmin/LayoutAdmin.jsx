import React from 'react';
import SideBarAdmin from '../SideBarAdmin';

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <SideBarAdmin />
      <div className="ml-64 p-6 w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
