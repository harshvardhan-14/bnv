import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateForm } from '../utils/validation.js';
import '../styles/UserForm.css';

function UserForm({ onSubmit, initialData = null, isLoading = false }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    gender: '',
    status: 'Active',
    profile: null,
    profilePreview: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      const dateOfBirth = initialData.dateOfBirth 
        ? new Date(initialData.dateOfBirth).toISOString().split('T')[0]
        : '';
      
      setFormData({
        ...initialData,
        dateOfBirth,
        gender: initialData.gender || '',
        status: initialData.status || 'Active',
        profile: initialData.profile || null,
        profilePreview: initialData.profileUrl || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'profile' && files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        profile: file,
        profilePreview: URL.createObjectURL(file)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleGenderChange = (e) => {
    const { value } = e.target;
    setFormData(prev => ({
      ...prev,
      gender: value
    }));
    
    if (errors.gender) {
      setErrors(prev => ({
        ...prev,
        gender: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      toast.error(firstError || 'Please fill in all required fields');
      return;
    }

    try {
      const formDataToSend = new FormData();
      
      // Append all form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'profile' && value instanceof File) {
          formDataToSend.append('profile', formData[key]);
        } else if (key !== 'profilePreview' && key !== 'profileUrl') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      await onSubmit(formDataToSend);
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response?.data?.errors) {
        const fieldErrors = {};
        error.response.data.errors.forEach(err => {
          fieldErrors[err.param] = err.msg;
        });
        setErrors(fieldErrors);
      }
      toast.error(error.response?.data?.message || 'Failed to save user');
    }
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className={errors.firstName ? 'error' : ''}
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className={errors.lastName ? 'error' : ''}
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
            className={errors.phoneNumber ? 'error' : ''}
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label>Gender *</label>
          <div className="gender-options">
            {['Male', 'Female', 'Other'].map(gender => (
              <label key={gender} className="gender-option">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={formData.gender === gender}
                  onChange={handleGenderChange}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label>Status</label>
          <div className="status-toggle">
            <label className="toggle-label">
              <input
                type="checkbox"
                name="status"
                checked={formData.status === 'Active'}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    status: e.target.checked ? 'Active' : 'Inactive'
                  }));
                }}
                className="toggle-checkbox"
              />
              <span className="toggle-switch"></span>
              <span className="toggle-text">
                {formData.status === 'Active' ? 'Active' : 'Inactive'}
              </span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth *</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className={errors.dateOfBirth ? 'error' : ''}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="address">Address *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter street address"
            className={errors.address ? 'error' : ''}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            className={errors.city ? 'error' : ''}
          />
          {errors.city && <span className="error-message">{errors.city}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="state">State *</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter state"
            className={errors.state ? 'error' : ''}
          />
          {errors.state && <span className="error-message">{errors.state}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">ZIP Code *</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter ZIP code"
            className={errors.zipCode ? 'error' : ''}
          />
          {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
        </div>

        <div className="form-group full-width">
          <label>Profile Picture</label>
          <div className="profile-upload-container">
            <div className="profile-preview">
              {formData.profilePreview ? (
                <img 
                  src={formData.profilePreview} 
                  alt="Profile Preview" 
                  className="profile-image"
                />
              ) : (
                <div className="profile-placeholder">
                  <span>No image selected</span>
                </div>
              )}
            </div>
            <div className="file-input-container">
              <input
                type="file"
                id="profile"
                name="profile"
                onChange={handleChange}
                accept="image/*"
                className={errors.profile ? 'error' : ''}
              />
              <label htmlFor="profile" className="file-input-label">
                Choose File
              </label>
              <span className="file-name">
                {formData.profile ? (typeof formData.profile === 'string' ? 'Image uploaded' : formData.profile.name) : 'No file chosen'}
              </span>
              {errors.profile && <span className="error-message">{errors.profile}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="btn btn-cancel" onClick={() => navigate('/')}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UserForm;
