import React from "react";

const TableHead = ({ id, name, email, username, companyName, actions }) => {
  return (
    <tr>
      <th className="group px-6 py-4 text-left">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{id}</span>
        </div>
      </th>
      <th className="group px-6 py-4 text-left">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{name}</span>
        </div>
      </th>
      <th className="group px-6 py-4 text-left">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{username}</span>
        </div>
      </th>
      <th className="group hidden sm:table-cell px-6 py-4 text-left">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{email}</span>
        </div>
      </th>
      <th className="group hidden md:table-cell px-6 py-4 text-left">
        <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          <span>{companyName}</span>
        </div>
      </th>
      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {actions}
      </th>
    </tr>
  );
};

export default TableHead;
