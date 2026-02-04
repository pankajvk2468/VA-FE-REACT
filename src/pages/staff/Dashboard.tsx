import React from 'react';
import { Users, TrendingUp, FileText, Clock } from 'lucide-react';

const StaffDashboard: React.FC = () => {
  return (
    <div className="fade-in">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <Users className="h-12 w-12 text-primary-600 mb-4" />
          <p className="text-sm text-gray-600">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">1,234</p>
        </div>
        <div className="card">
          <FileText className="h-12 w-12 text-green-600 mb-4" />
          <p className="text-sm text-gray-600">Applications</p>
          <p className="text-3xl font-bold text-gray-900">567</p>
        </div>
        <div className="card">
          <Clock className="h-12 w-12 text-yellow-600 mb-4" />
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-3xl font-bold text-gray-900">89</p>
        </div>
        <div className="card">
          <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
          <p className="text-sm text-gray-600">This Month</p>
          <p className="text-3xl font-bold text-gray-900">+12%</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
