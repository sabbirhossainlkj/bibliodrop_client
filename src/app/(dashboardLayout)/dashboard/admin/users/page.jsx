"use client";

import React, { useState, useEffect } from "react";
import { Shield, User, Trash2, Mail, Calendar, RefreshCw } from "lucide-react";

const ManageUser = () => {
  // ডামি ডেটাতে joinDate যুক্ত করা হয়েছে
  const [users, setUsers] = useState([
    { _id: "1", name: "Rakib Ahmed", email: "rakib@example.com", role: "user", joinDate: "2024-01-15" },
    {
      _id: "2",
      name: "Sultana Razia",
      email: "razia@example.com",
      role: "librarian",
      joinDate: "2023-11-20"
    },
    {
      _id: "3",
      name: "Tanvir Hasan",
      email: "tanvir@example.com",
      role: "admin",
      joinDate: "2022-05-10"
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Backend not connected, using client-side fallback data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to change user role
  const handleRoleChange = async (id, name, newRole) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the role of "${name}" to "${newRole}"?`,
    );
    if (!confirmChange) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user,
        ),
      );
      alert("User role updated successfully.");
    } catch (err) {
      console.error(err);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, role: newRole } : user,
        ),
      );
      alert("Backend API Error! Local state updated for preview.");
    }
  };

  // Function to delete user
  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("User deleted successfully.");
    } catch (err) {
      console.error(err);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("Backend API Error! Local state updated for preview.");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading Users Data...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 bg-[#f8fafc] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Manage Users</h1>
            <p className="text-gray-500 mt-1">
              Update user roles or remove users from the system
            </p>
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-100 flex items-center gap-1.5">
            <User size={16} />
            Total: {users.length} Users
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="p-5 text-left text-sm font-semibold text-gray-600">
                    User Details
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-600">
                    Email
                  </th>
                  {/* Join Date হেডার যোগ করা হয়েছে */}
                  <th className="p-5 text-left text-sm font-semibold text-gray-600">
                    Join Date
                  </th>
                  <th className="p-5 text-left text-sm font-semibold text-gray-600">
                    Current Role
                  </th>
                  <th className="p-5 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex gap-3 items-center">
                        <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                          <User size={18} />
                        </div>
                        <h3 className="font-bold text-gray-900">{user.name}</h3>
                      </div>
                    </td>

                    <td className="p-5 text-gray-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Mail size={14} className="text-gray-400" />
                        {user.email}
                      </div>
                    </td>

                    {/* Join Date ডাটা রো যোগ করা হয়েছে */}
                    <td className="p-5 text-gray-600 text-sm">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-gray-400" />
                        {user.joinDate
                          ? new Date(user.joinDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                          : "N/A"}
                      </div>
                    </td>

                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider ${user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "librarian"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex gap-2 justify-center items-center">
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user._id, user.name, "admin")
                            }
                            className="bg-purple-50 text-purple-700 hover:bg-purple-100 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                            title="Make Admin"
                          >
                            <Shield size={12} />+ Admin
                          </button>
                        )}

                        {user.role !== "librarian" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user._id, user.name, "librarian")
                            }
                            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                            title="Make Librarian"
                          >
                            <RefreshCw size={12} />+ Librarian
                          </button>
                        )}

                        {user.role !== "user" && (
                          <button
                            onClick={() =>
                              handleRoleChange(user._id, user.name, "user")
                            }
                            className="bg-gray-50 text-gray-600 hover:bg-gray-100 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          >
                            Demote to User
                          </button>
                        )}

                        <div className="h-4 w-[1px] bg-gray-200 mx-1"></div>

                        <button
                          onClick={() => handleDeleteUser(user._id, user.name)}
                          className="p-2 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;