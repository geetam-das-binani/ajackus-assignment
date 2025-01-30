import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import Pagination from "../components/Pagination";
import axios from "axios";
import toast from "react-hot-toast";
import { tableHeadingLabels } from "../common/labels";
import TableHead from "../components/TableHead";
import TableBody from "../components/TableBody";
import { useStateContext } from "../context/User";
import { API_BASE_URL } from "../common/apiUrl";
const UserList = () => {
  const navigate = useNavigate();

  const { users, loading, setUsers } = useStateContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const usersPerPage = 5;

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== Number(userId))
        );
        setCurrentPage(1);
        toast.success("User deleted successfully!");
      }
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    }
  };

  // Filter  users based on search results
  const filteredUsers = users.filter((user) => {
    return Object.keys(user).some((key) => {
      const value = user[key].toString();

      return value.toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const currentUsers = filteredUsers.slice(
    currentPage * 5 - 5,
    currentPage * 5
  );

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

        {!loading && (
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
                  <TableHead {...tableHeadingLabels} />
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.length > 0 &&
                    currentUsers?.map((user) => (
                      <TableBody
                        key={user.id}
                        {...user}
                        handleDelete={handleDelete}
                      />
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
        )}
        {loading && (
          <div className="flex items-center justify-center h-80">
            <div className="h-32 w-32 border-t-2 border-gray-900 animate-spin  rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
