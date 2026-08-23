import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  const location = useLocation();

  // Only Medical Reports should have NO scrollbar
  const isMedicalReports = location.pathname === '/medical-reports';
  const isBodyExplorer = location.pathname === '/body-explorer';

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen">

        <Header
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          isMenuOpen={isSidebarOpen}
        />

        <main
  className={`flex-1 bg-white ${
    isMedicalReports
      ? 'overflow-hidden'
      : 'overflow-y-auto'
  }`}
>
  <div className="w-full">
    <Outlet />
  </div>
</main>

      </div>

    </div>
  );
};

export default DashboardLayout;