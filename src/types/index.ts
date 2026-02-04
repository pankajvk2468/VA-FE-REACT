export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'representative' | 'employee' | 'client' | 'user';
  phone?: string;
  companyId?: string;
  companyName?: string;
  isSuperAdmin?: boolean;
  profileImage?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  verifyOTP: () => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: () => Promise<void>;
}

export interface FormData {
  id: string;
  clientId: string;
  status: 'draft' | 'submitted' | 'pending' | 'approved' | 'rejected';
  formType: string;
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  isRead: boolean;
  createdAt: string;
  attachments?: string[];
}

export interface Company {
  id: string;
  name: string;
  alias?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}

export interface Professional {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  companyId: string;
  companyName: string;
  role: string;
  isActive: boolean;
  isSuperAdmin: boolean;
}
