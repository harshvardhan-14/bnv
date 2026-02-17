import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import UserCard from '../components/UserCard';
import { userAPI } from '../services/api';
import '../styles/Pages.css';

function ViewPage() {
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

  if (loading) {
    return (
      <div className="page">
        <Header title="View User" />
        <main className="page-content">
          <div className="loading">Loading user data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <Header title="View User Details" />
      <main className="page-content">
        {user && (
          <>
            <UserCard user={user} />
            <div className="view-page-actions">
              <button 
                className="btn btn-edit"
                onClick={() => navigate(`/edit/${id}`)}
              >
                Edit User
              </button>
              <button 
                className="btn btn-back"
                onClick={() => navigate('/')}
              >
                Back to List
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default ViewPage;
