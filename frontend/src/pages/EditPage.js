import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import { userAPI } from '../services/api';
import '../styles/Pages.css';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userAPI.getUserById(id);
        setUser(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load user');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    const response = await userAPI.updateUser(id, formData);
    toast.success(response.message || 'User updated successfully');
    return response;
  };

  if (loading) {
    return (
      <div className="page">
        <Header title="Edit User" />
        <main className="page-content">
          <div className="loading">Loading user data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header title="Edit User" />
      <main className="page-content">
        {user && <UserForm onSubmit={handleSubmit} initialData={user} />}
      </main>
    </div>
  );
}

export default EditPage;
