import React from 'react';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import { userAPI } from '../services/api';
import '../styles/Pages.css';

function AddPage() {
  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting form data:', formData);
      const data = await userAPI.createUser(formData);
      toast.success(data.message || 'User created successfully');
      return data;
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        
        // Show validation errors if they exist
        if (error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(err => err.msg).join('\n');
          toast.error(errorMessages || 'Validation error');
        } else {
          toast.error(error.response.data.message || 'An error occurred');
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
        toast.error(error.message || 'An error occurred');
      }
      throw error; // Re-throw to allow UserForm to handle it as well
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
