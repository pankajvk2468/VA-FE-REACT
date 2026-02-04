import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MyAccount: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
        <div className="space-y-4">
          <div>
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              defaultValue={user?.firstName}
            />
          </div>
          <div>
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              defaultValue={user?.lastName}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              defaultValue={user?.email}
              disabled
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input"
              defaultValue={user?.phone}
            />
          </div>
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
