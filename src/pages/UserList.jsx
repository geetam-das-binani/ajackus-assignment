import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, UserPlus, Search, ArrowUpDown } from "lucide-react";
import Pagination from "../components/Pagination";
import axios from "axios";
import toast from "react-hot-toast";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  // const [sortField, setSortField] = useState(null);
  // const [sortDirection, setSortDirection] = useState("asc");
  const usersPerPage = 5;

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      if (response.status === 200) {
        toast.success("User deleted successfully!");
        fetchUsers();
      }
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // const handleSort = (field) => {
  //   if (sortField === field) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortField(field);
  //     setSortDirection("asc");
  //   }
  // };

  // Filter and sort users
  const filteredUsers = users.filter((user) => {
    return Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // if (sortField) {
  //   filteredUsers.sort((a, b) => {
  //     const aValue = a[sortField].toString().toLowerCase();
  //     const bValue = b[sortField].toString().toLowerCase();
  //     return sortDirection === "asc"
  //       ? aValue.localeCompare(bValue)
  //       : bValue.localeCompare(aValue);
  //   });
  // }

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    currentPage * 5 - 5,
    currentPage * 5
  );

  // const SortIcon = ({ field }) => (
  //   <ArrowUpDown
  //     className={`inline-block h-4 w-4 cursor-pointer transition-colors
  //       ${sortField === field ? "text-indigo-600" : "text-gray-400"}`}
  //     onClick={() => handleSort(field)}
  //   />
  // );

  const fetchUsers = async () => {
    try {
      const { data } = await axios(
        "https://jsonplaceholder.typicode.com/users"
      );
      //   console.log(data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <button
            onClick={() => navigate("/add")}
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by username/firstName/email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="group px-6 py-4 text-left">
                    <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>ID</span>
                      {/* <SortIcon field="id" /> */}
                    </div>
                  </th>
                  <th className="group px-6 py-4 text-left">
                    <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>First Name</span>
                      {/* <SortIcon field="firstName" /> */}
                    </div>
                  </th>
                  <th className="group px-6 py-4 text-left">
                    <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Username</span>
                      {/* <SortIcon field="username" /> */}
                    </div>
                  </th>
                  <th className="group hidden sm:table-cell px-6 py-4 text-left">
                    <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Email</span>
                      {/* <SortIcon field="email" /> */}
                    </div>
                  </th>
                  <th className="group hidden md:table-cell px-6 py-4 text-left">
                    <div className="flex items-center space-x-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span>Company Name</span>
                      {/* <SortIcon field="department" /> */}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.username}
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {user.company.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-3">
                        <button
                          onClick={() => navigate(`/edit/${user.id}`)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;
