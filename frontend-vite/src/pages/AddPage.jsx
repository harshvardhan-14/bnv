import React from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header.jsx';
import UserForm from '../components/UserForm.jsx';
import { userAPI } from '../services/api.js';
import '../styles/Pages.css';

function AddPage() {
  const handleSubmit = async (formData) => {
    try {
      const data = await userAPI.createUser(formData);
      toast.success(data.message || 'User created successfully');
      return data;
    } catch (error) {
      console.error('Error creating user:', error.message);
      
      // Show validation errors if they exist
      if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        toast.error(errorMessages || 'Validation error');
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to create user. Please try again.');
      }
      throw error;
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="page-content">
        <h2 className="page-main-title">Register Your Details</h2>
        <UserForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}

export default AddPage;
