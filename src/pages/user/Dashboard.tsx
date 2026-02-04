import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FileText, MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data
  const applicationStatus = {
    status: 'In Progress',
    lastUpdated: '2 days ago',
    completion: 75,
  };

  const recentMessages = [
    {
      id: '1',
      from: 'Aid & Attendance Support',
      subject: 'Welcome to the Portal',
      date: '2024-01-15',
      isRead: false,
    },
    {
      id: '2',
      from: 'Your Representative',
      subject: 'Application Update',
      date: '2024-01-14',
      isRead: true,
    },
  ];

  return (
    <div className="space-y-8 fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-primary-100 text-lg">
          Track your application progress and manage your benefits
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Application Status</p>
              <p className="text-2xl font-bold text-gray-900">{applicationStatus.status}</p>
            </div>
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span className="font-semibold">{applicationStatus.completion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${applicationStatus.completion}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">
                {recentMessages.filter((m) => !m.isRead).length}
              </p>
            </div>
            <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <Link
            to="/messages"
            className="mt-4 text-base text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
          >
            View Messages →
          </Link>
        </div>

        <div className="card card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Update</p>
              <p className="text-2xl font-bold text-gray-900">{applicationStatus.lastUpdated}</p>
            </div>
            <div className="h-14 w-14 bg-purple-100 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Card */}
        <div className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Application</h2>
              <p className="text-gray-600">Continue where you left off</p>
            </div>
            <span className="badge badge-warning">In Progress</span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Personal Information - Complete</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Contact Details - Complete</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-yellow-600 flex-shrink-0" />
              <span className="text-gray-700">Medical Information - In Progress</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-6 w-6 text-gray-400 flex-shrink-0" />
              <span className="text-gray-500">Financial Details - Not Started</span>
            </div>
          </div>

          <Link to="/application" className="btn btn-primary w-full btn-lg">
            Continue Application
          </Link>
        </div>

        {/* Recent Messages */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Messages</h2>
          
          <div className="space-y-4 mb-6">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border-2 ${
                  message.isRead
                    ? 'border-gray-200 bg-white'
                    : 'border-primary-200 bg-primary-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className={`font-semibold ${message.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                    {message.from}
                  </p>
                  {!message.isRead && (
                    <span className="h-2 w-2 bg-primary-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-gray-700 mb-2">{message.subject}</p>
                <p className="text-sm text-gray-500">{message.date}</p>
              </div>
            ))}
          </div>

          <Link to="/messages" className="btn btn-outline w-full">
            View All Messages
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-700">
              Our support team is available to assist you with your application.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Link to="/messages" className="btn btn-primary">
              Send Message
            </Link>
            <a href="tel:888-600-1701" className="btn btn-outline">
              Call 888-600-1701
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
