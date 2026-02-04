import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Home,
  FileText,
  MessageSquare,
  Users,
  Building2,
  UserCog,
  Shield,
  X,
  Briefcase,
} from 'lucide-react';
import { clsx } from 'clsx';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  roles?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const userNavItems: NavItem[] = [
    { name: 'Home', path: '/dashboard', icon: Home, roles: ['user', 'client'] },
    { name: 'Application', path: '/application', icon: FileText, roles: ['user', 'client'] },
    { name: 'Messages', path: '/messages', icon: MessageSquare, roles: ['user', 'client'] },
  ];

  const staffNavItems: NavItem[] = [
    { name: 'Dashboard', path: '/staff/dashboard', icon: Home, roles: ['admin', 'representative', 'employee'] },
    { name: 'Users', path: '/staff/users', icon: Users, roles: ['admin', 'representative', 'employee'] },
    { name: 'Clients', path: '/staff/clients', icon: FileText, roles: ['admin', 'representative', 'employee'] },
    { name: 'Companies', path: '/staff/companies', icon: Building2, roles: ['admin'] },
    { name: 'Professionals', path: '/staff/professionals', icon: Briefcase, roles: ['admin'] },
    { name: 'Administrators', path: '/staff/administrators', icon: Shield, roles: ['admin'] },
    { name: 'Messages', path: '/staff/messages', icon: MessageSquare, roles: ['admin', 'representative', 'employee'] },
  ];

  const getNavItems = (): NavItem[] => {
    if (!user) return [];
    
    if (user.role === 'admin' || user.role === 'representative' || user.role === 'employee') {
      return staffNavItems.filter(item => !item.roles || item.roles.includes(user.role));
    }
    
    return userNavItems.filter(item => !item.roles || item.roles.includes(user.role));
  };

  const navItems = getNavItems();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-20 left-0 bottom-0 w-64 bg-white border-r-2 border-gray-200 z-40 transition-transform duration-300 overflow-y-auto',
          {
            'translate-x-0': isOpen,
            '-translate-x-full lg:translate-x-0': !isOpen,
          }
        )}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        <nav className="p-4 space-y-2 mt-4 lg:mt-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={clsx(
                  'flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all',
                  {
                    'bg-primary-100 text-primary-700': active,
                    'text-gray-700 hover:bg-gray-100': !active,
                  }
                )}
              >
                <Icon className="h-6 w-6 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Help Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50">
          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-primary-900 mb-2">Need Help?</h3>
            <p className="text-xs text-primary-700 mb-3">
              Our support team is here to assist you.
            </p>
            <Link
              to="/messages"
              className="inline-block w-full text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
