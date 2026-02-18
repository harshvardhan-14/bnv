import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userAPI, getImageURL } from '../services/api.js';
import '../styles/UserTable.css';

function UserTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [dbError, setDbError] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, isSearching, sortBy, order]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setDbError(null);
      let response;
      
      if (isSearching && searchQuery) {
        response = await userAPI.searchUsers(searchQuery, currentPage, itemsPerPage);
      } else {
        response = await userAPI.getAllUsers(currentPage, itemsPerPage, sortBy, order);
      }
      
      setUsers(response.data.data);
      setTotalPages(response.data.pagination.pages);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch users';
      const errorCode = error.response?.status;
      
      if (errorCode === 503 || errorMessage.includes('Database')) {
        setDbError('Database connection failed. Please ensure MongoDB Atlas is running and your IP is whitelisted. Check the backend logs for details.');
        console.error('Database error:', errorMessage);
      } else {
        toast.error(errorMessage);
      }
      
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
    setIsSearching(value.length > 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        toast.success('User deleted successfully');
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const response = await userAPI.toggleUserStatus(id);
      
      // Update local state with the updated user object
      setUsers(users.map(user =>
        user._id === id ? response.data.data : user
      ));
      
      toast.success(response.data.message || 'Status updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
      fetchUsers(); // Refresh to get correct status
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await userAPI.exportToCSV();
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Users exported successfully');
    } catch (error) {
      toast.error('Failed to export users');
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
    setCurrentPage(1);
  };

  return (
    <div className="user-table-container">
      <div className="table-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <button
            className="btn btn-search"
            onClick={() => setIsSearching(searchQuery.length > 0)}
          >
            Search
          </button>
        </div>
        <div className="action-buttons">
          <button 
            className="btn btn-add" 
            onClick={() => navigate('/add')}
          >
            + Add User
          </button>
          <button 
            className="btn btn-export" 
            onClick={handleExportCSV}
          >
            Export CSV
          </button>
        </div>
      </div>

      {dbError ? (
        <div className="error-message">
          <strong>⚠️ Error:</strong> {dbError}
        </div>
      ) : loading ? (
        <div className="loading">Loading users...</div>
      ) : users.length === 0 ? (
        <div className="no-data">No users found</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('firstName')}>
                    FullName {sortBy === 'firstName' && (order === 'asc' ? '↑' : '↓')}
                  </th>
                  <th onClick={() => handleSort('email')}>
                    Email {sortBy === 'email' && (order === 'asc' ? '↑' : '↓')}
                  </th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Status</th>
                  <th>Profile</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.gender || 'N/A'}</td>
                    <td>
                      <button
                        className={`status-badge ${user.status === 'Active' ? 'active' : 'inactive'}`}
                        onClick={() => handleStatusToggle(user._id, user.status)}
                        title="Click to toggle status"
                      >
                        {user.status || 'Active'}
                      </button>
                    </td>
                    <td>
                      {user.profilePicture ? (
                        <img 
                          src={getImageURL(user.profilePicture)} 
                          alt="Profile" 
                          className="profile-thumbnail"
                        />
                      ) : (
                        <div className="no-profile">No Image</div>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn btn-view"
                        onClick={() => navigate(`/view/${user._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="btn btn-edit"
                        onClick={() => navigate(`/edit/${user._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="btn btn-pagination"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-pagination"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserTable;
