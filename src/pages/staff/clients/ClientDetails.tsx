import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Mail, Phone, Calendar, Building, User, FileText, Activity } from 'lucide-react';

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock data - replace with actual API call
  const client = {
    id,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@example.com',
    phone: '(555) 111-2222',
    dateOfBirth: '1985-05-15',
    ssn: '***-**-5678',
    address: '456 Oak Avenue',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    company: 'Veterans Law Firm',
    companyId: '1',
    representative: 'John Smith',
    representativeId: '1',
    status: 'active',
    applicationStatus: 'submitted',
    createdAt: '2024-01-15',
    lastLogin: '2024-01-20 14:30 PM',
    totalApplications: 2,
    submittedApplications: 1,
    approvedApplications: 1,
    veteranStatus: 'Honorably Discharged',
    branchOfService: 'Army',
    serviceStartDate: '2005-06-01',
    serviceEndDate: '2010-05-31',
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/staff/clients')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Details</h1>
            <p className="text-gray-600 mt-1">View detailed client information</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link to={`/staff/clients/${id}/message`} className="btn btn-outline flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Send Message
          </Link>
          <Link to={`/staff/clients/${id}/edit`} className="btn btn-primary flex items-center">
            <Edit className="h-5 w-5 mr-2" />
            Edit Client
          </Link>
        </div>
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
                <p className="mt-1 text-lg text-gray-900">{client.firstName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <p className="mt-1 text-lg text-gray-900">{client.lastName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email Address</label>
                <div className="flex items-center mt-1">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-lg text-gray-900">{client.email}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Phone Number</label>
                <div className="flex items-center mt-1">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <p className="text-lg text-gray-900">{client.phone}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(client.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">SSN</label>
                <p className="mt-1 text-lg text-gray-900">{client.ssn}</p>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600">Street Address</label>
                <p className="mt-1 text-lg text-gray-900">{client.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">City</label>
                <p className="mt-1 text-lg text-gray-900">{client.city}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">State</label>
                <p className="mt-1 text-lg text-gray-900">{client.state}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">ZIP Code</label>
                <p className="mt-1 text-lg text-gray-900">{client.zipCode}</p>
              </div>
            </div>
          </div>

          {/* Military Service Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Military Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Branch of Service</label>
                <p className="mt-1 text-lg text-gray-900">{client.branchOfService}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Veteran Status</label>
                <p className="mt-1 text-lg text-gray-900">{client.veteranStatus}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Service Start Date</label>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(client.serviceStartDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Service End Date</label>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(client.serviceEndDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Representative Information */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Representative Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Company
                </label>
                <Link 
                  to={`/staff/companies/${client.companyId}`}
                  className="mt-1 text-lg text-blue-600 hover:text-blue-700 font-medium"
                >
                  {client.company}
                </Link>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Representative
                </label>
                <Link 
                  to={`/staff/professionals/${client.representativeId}`}
                  className="mt-1 text-lg text-blue-600 hover:text-blue-700 font-medium"
                >
                  {client.representative}
                </Link>
              </div>
            </div>
          </div>

          {/* Application Statistics */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Application Statistics</h2>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{client.totalApplications}</p>
                <p className="text-sm text-gray-600 mt-2">Total Applications</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{client.submittedApplications}</p>
                <p className="text-sm text-gray-600 mt-2">Submitted</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">{client.approvedApplications}</p>
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
                  <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-danger'} text-base`}>
                    {client.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Application Status
                </label>
                <div className="mt-2">
                  <span className="badge badge-info text-base">{client.applicationStatus}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created Date
                </label>
                <p className="mt-2 text-gray-900">
                  {new Date(client.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Last Login
                </label>
                <p className="mt-2 text-gray-900">{client.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full btn btn-outline text-left justify-start">
                <FileText className="h-5 w-5 mr-2" />
                View Applications
              </button>
              <button className="w-full btn btn-outline text-left justify-start">
                <Mail className="h-5 w-5 mr-2" />
                Send Message
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

export default ClientDetails;
