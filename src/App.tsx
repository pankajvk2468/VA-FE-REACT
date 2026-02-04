import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import MainLayout from './components/layouts/MainLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// User/Client Pages
import UserDashboard from './pages/user/Dashboard';
import ApplicationForm from './pages/user/ApplicationForm';
import FormReview from './pages/user/FormReview';
import UserMessages from './pages/user/Messages';

// Staff Pages (Admin, Representative, Employee)
import StaffDashboard from './pages/staff/Dashboard';
import UsersList from './pages/staff/users/UsersList';
import UserDetails from './pages/staff/users/UserDetails';
import UserEdit from './pages/staff/users/UserEdit';
import ClientsList from './pages/staff/clients/ClientsList';
import ClientDetails from './pages/staff/clients/ClientDetails';
import ClientEdit from './pages/staff/clients/ClientEdit';
import { CompaniesList } from './pages/staff/companies/CompaniesList';
import { CompanyEdit } from './pages/staff/companies/CompanyEdit';
import { ProfessionalsList } from './pages/staff/professionals/ProfessionalsList';
import { ProfessionalEdit } from './pages/staff/professionals/ProfessionalEdit';
import { AdministratorsList } from './pages/staff/administrators/AdministratorsList';
import StaffMessages from './pages/staff/Messages';

// Account Pages
import MyAccount from './pages/account/MyAccount';
import ChangePassword from './pages/account/ChangePassword';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} toastOptions={{
        duration: 4000,
        style: {
          fontSize: '16px',
          padding: '16px',
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }} />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* User/Client Routes */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/application" element={<ApplicationForm />} />
            <Route path="/application/review" element={<FormReview />} />
            <Route path="/messages" element={<UserMessages />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Staff Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'representative', 'employee']}><MainLayout /></ProtectedRoute>}>
            <Route path="/staff/dashboard" element={<StaffDashboard />} />
            <Route path="/staff/users" element={<UsersList />} />
            <Route path="/staff/users/new" element={<UserEdit />} />
            <Route path="/staff/users/:id" element={<UserDetails />} />
            <Route path="/staff/users/:id/edit" element={<UserEdit />} />
            <Route path="/staff/clients" element={<ClientsList />} />
            <Route path="/staff/clients/new" element={<ClientEdit />} />
            <Route path="/staff/clients/:id" element={<ClientDetails />} />
            <Route path="/staff/clients/:id/edit" element={<ClientEdit />} />
            <Route path="/staff/companies" element={<CompaniesList />} />
            <Route path="/staff/companies/:id/edit" element={<CompanyEdit />} />
            <Route path="/staff/professionals" element={<ProfessionalsList />} />
            <Route path="/staff/professionals/:id/edit" element={<ProfessionalEdit />} />
            <Route path="/staff/administrators" element={<AdministratorsList />} />
            <Route path="/staff/messages" element={<StaffMessages />} />
          </Route>

          {/* Default Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
