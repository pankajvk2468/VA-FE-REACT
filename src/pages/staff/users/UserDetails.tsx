import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, Calendar, Shield, Activity } from 'lucide-react';

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const user = {
    id,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    role: 'User',
    status: 'active',
    createdAt: '2024-01-15',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
    dateOfBirth: '1985-03-20',
    ssn: '***-**-1234',
    lastLogin: '2024-01-20 10:30 AM',
    totalApplications: 3,
    pendingApplications: 1,
    approvedApplications: 2,
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/staff/users')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600 mt-1">View detailed user information</p>
          </div>
        </div>
        <Link to={`/staff/users/${id}/edit`} className="btn btn-primary flex items-center">
          <Edit className="h-5 w-5 mr-2" />
          Edit User
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <p className="mt-1 text-lg text-gray-900">{user.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <p className="mt-1 text-lg text-gray-900">{user.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <div className="flex items-center mt-1">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-lg text-gray-900">{user.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <div className="flex items-center mt-1">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-lg text-gray-900">{user.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(user.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">SSN</label>
                <p className="mt-1 text-lg text-gray-900">{user.ssn}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Street Address</label>
                <p className="mt-1 text-lg text-gray-900">{user.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">City</label>
                <p className="mt-1 text-lg text-gray-900">{user.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">State</label>
                <p className="mt-1 text-lg text-gray-900">{user.state}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ZIP Code</label>
                <p className="mt-1 text-lg text-gray-900">{user.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Application Statistics */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Application Statistics</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{user.totalApplications}</p>
                <p className="text-sm text-gray-600 mt-2">Total Applications</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{user.pendingApplications}</p>
                <p className="text-sm text-gray-600 mt-2">Pending</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{user.approvedApplications}</p>
                <p className="text-sm text-gray-600 mt-2">Approved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Account Status</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Status</label>
                <div className="mt-2">
                  <span className={`badge ${user.status === 'active' ? 'badge-success' : 'badge-danger'} text-base`}>
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Role
                </label>
                <div className="mt-2">
                  <span className="badge badge-info text-base">{user.role}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created Date
                </label>
                <p className="mt-2 text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Last Login
                </label>
                <p className="mt-2 text-gray-900">{user.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn btn-outline text-left justify-start">
                Send Message
              </button>
              <button className="w-full btn btn-outline text-left justify-start">
                View Applications
              </button>
              <button className="w-full btn btn-outline text-left justify-start">
                Reset Password
              </button>
              <button className="w-full btn btn-outline text-left justify-start text-red-600 hover:bg-red-50">
                Deactivate Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
