import React from 'react';
import '../styles/UserCard.css';

function UserCard({ user }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dateString) => {
    const birthDate = new Date(dateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="user-card-container">
      <div className="user-card">
        <div className="card-header">
          <h2 className="user-name">{user.firstName} {user.lastName}</h2>
          <p className="user-title">User Profile</p>
        </div>

        <div className="card-content">
          <div className="card-section">
            <h3>Profile Picture</h3>
            <div className="profile-picture-container">
              {user.profilePicture ? (
                <img 
                  src={`http://localhost:5000${user.profilePicture}`} 
                  alt="Profile" 
                  className="profile-image-large"
                />
              ) : (
                <div className="profile-placeholder">No profile picture</div>
              )}
            </div>
          </div>

          <div className="card-section">
            <h3>Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div className="info-item">
                <label>Date of Birth</label>
                <p>{formatDate(user.dateOfBirth)}</p>
              </div>
              <div className="info-item">
                <label>Age</label>
                <p>{calculateAge(user.dateOfBirth)} years old</p>
              </div>
              <div className="info-item">
                <label>Gender</label>
                <p>{user.gender || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Status</label>
                <p>
                  <span className={`status-badge-card ${user.status === 'Active' ? 'active' : 'inactive'}`}>
                    {user.status || 'Active'}
                  </span>
                </p>
              </div>
              <div className="info-item">
                <label>Email</label>
                <p><a href={`mailto:${user.email}`}>{user.email}</a></p>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <p><a href={`tel:${user.phoneNumber}`}>{user.phoneNumber}</a></p>
              </div>
            </div>
          </div>

          <div className="card-section">
            <h3>Address Information</h3>
            <div className="info-grid">
              <div className="info-item full-width">
                <label>Street Address</label>
                <p>{user.address}</p>
              </div>
              <div className="info-item">
                <label>City</label>
                <p>{user.city}</p>
              </div>
              <div className="info-item">
                <label>State</label>
                <p>{user.state}</p>
              </div>
              <div className="info-item">
                <label>Zip Code</label>
                <p>{user.zipCode}</p>
              </div>
            </div>
          </div>

          <div className="card-section">
            <h3>Account Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Created On</label>
                <p>{formatDate(user.createdAt)}</p>
              </div>
              <div className="info-item">
                <label>Last Updated</label>
                <p>{formatDate(user.updatedAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
