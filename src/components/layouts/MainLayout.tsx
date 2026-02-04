import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navigation/Navbar';
// Make sure the Sidebar component exists at this path or update the path accordingly
// Update the import path below if Sidebar exists elsewhere, e.g.:
import Sidebar from '../navigation/Sidebar';
// If Sidebar does not exist, create it at src/components/navigation/Sidebar.tsx or Sidebar/index.tsx

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="container-custom py-8 pt-24">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
