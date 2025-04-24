import React from "react";

const Tabs = () => {
  return (
    <div className="ml-64 px-6">
      <div className="tabs mt-2 border-b border-gray-200">
        <a className="tab tab-bordered tab-active">Current Members</a>
        <a className="tab tab-bordered">Pending Members</a>
        <a className="tab tab-bordered">Rejected Members</a>
      </div>
    </div>
  );
};

export default Tabs;
