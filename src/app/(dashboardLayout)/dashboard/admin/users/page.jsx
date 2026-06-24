"use client";

import React, { useState, useEffect } from "react";
import { Shield, User, Trash2, Mail, Calendar, RefreshCw, Plus, X } from "lucide-react";
import { apiFetch, ensureToken } from "@/lib/api";
import { authClient } from "@/lib/auth-client";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = authClient.useSession();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiFetch("http://localhost:5000/api/users");
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
    ensureToken(session);
    fetchUsers();
  }, [session]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create user");
        return;
      }

      setUsers([...users, { ...newUser, _id: data.insertedId, joinDate: new Date().toISOString() }]);
      setShowModal(false);
      setNewUser({ name: "", email: "", role: "user", password: "" });
      alert("User created successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRoleChange = async (id, name, newRole) => {
    const confirmChange = window.confirm(
      `Are you sure you want to change the role of "${name}" to "${newRole}"?`,
    );
    if (!confirmChange) return;

    try {
      const res = await apiFetch(`http://localhost:5000/api/users/${id}/role`, {
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

  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete "${name}"?`,
    );
    if (!confirmDelete) return;

    try {
      const res = await apiFetch(`http://localhost:5000/api/users/${id}`, {
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
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add User
          </button>
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

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter user name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  required
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="user">User</option>
                  <option value="librarian">Librarian</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;