import React from 'react';
import SideBar from '../SideBar';

const LayoutAdmin = ({ children }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="ml-64 p-6 w-full">
        {children}
      </div>
    </div>
  );
};

export default LayoutAdmin;