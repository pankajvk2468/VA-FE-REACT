import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit, Eye, Trash2, Filter, FileText, Mail } from 'lucide-react';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  representative: string;
  status: 'active' | 'inactive' | 'pending';
  applicationStatus: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
}

const ClientsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data - replace with actual API call
  const [clients] = useState<Client[]>([
    { id: '1', firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com', phone: '(555) 111-2222', company: 'Veterans Law Firm', representative: 'John Smith', status: 'active', applicationStatus: 'submitted', createdAt: '2024-01-15' },
    { id: '2', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@example.com', phone: '(555) 222-3333', company: 'Legal Aid Services', representative: 'Jane Doe', status: 'active', applicationStatus: 'approved', createdAt: '2024-01-14' },
    { id: '3', firstName: 'David', lastName: 'Brown', email: 'david.b@example.com', phone: '(555) 333-4444', company: 'Veterans Law Firm', representative: 'John Smith', status: 'pending', applicationStatus: 'draft', createdAt: '2024-01-13' },
    { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily.d@example.com', phone: '(555) 444-5555', company: 'VA Support Group', representative: 'Bob Wilson', status: 'active', applicationStatus: 'rejected', createdAt: '2024-01-12' },
    { id: '5', firstName: 'Robert', lastName: 'Miller', email: 'robert.m@example.com', phone: '(555) 555-6666', company: 'Legal Aid Services', representative: 'Jane Doe', status: 'inactive', applicationStatus: 'approved', createdAt: '2024-01-11' },
  ]);

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      console.log('Delete client:', id);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active': return 'badge-success';
      case 'inactive': return 'badge-danger';
      case 'pending': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  const getApplicationStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'badge-success';
      case 'rejected': return 'badge-danger';
      case 'submitted': return 'badge-info';
      case 'draft': return 'badge-warning';
      default: return 'badge-info';
    }
  };

  return (
    <div className="fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients Management</h1>
          <p className="text-gray-600">Manage veteran clients and their applications</p>
        </div>
        <Link to="/staff/clients/new" className="btn btn-primary flex items-center">
          <Plus className="h-5 w-5 mr-2" />
          Add New Client
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Clients</p>
              <p className="text-3xl font-bold text-blue-600">{clients.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active</p>
              <p className="text-3xl font-bold text-green-600">
                {clients.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">
                {clients.filter(c => c.status === 'pending').length}
              </p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Approved</p>
              <p className="text-3xl font-bold text-purple-600">
                {clients.filter(c => c.applicationStatus === 'approved').length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="form-label">Search Clients</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
                placeholder="Search by name, email, or company..."
              />
            </div>
          </div>
          <div>
            <label className="form-label">Filter by Status</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="form-input pl-10"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Representative</th>
                <th>Status</th>
                <th>Application</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedClients.length > 0 ? (
                paginatedClients.map((client) => (
                  <tr key={client.id}>
                    <td className="font-medium text-gray-900">
                      {client.firstName} {client.lastName}
                    </td>
                    <td className="text-gray-700">{client.email}</td>
                    <td className="text-gray-700">{client.phone}</td>
                    <td className="text-gray-700">{client.company}</td>
                    <td className="text-gray-700">{client.representative}</td>
                    <td>
                      <span className={`badge ${getStatusBadgeClass(client.status)}`}>
                        {client.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getApplicationStatusBadgeClass(client.applicationStatus)}`}>
                        {client.applicationStatus}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/staff/clients/${client.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <Link
                          to={`/staff/clients/${client.id}/edit`}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Client"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Send Message"
                        >
                          <Mail className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Client"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredClients.length)} of {filteredClients.length} clients
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="btn btn-outline py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientsList;
