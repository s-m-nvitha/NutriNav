import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const location = useLocation();

  // Medical Reports and Results should have NO scrollbar
  const isMedicalReports = location.pathname === '/medical-reports';
  const isResults = location.pathname === '/results';

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
    isMedicalReports || isResults
      ? 'overflow-hidden'
      : 'overflow-y-auto'
  }`}
>
  <div className="w-full px-5 lg:px-6">
    <Outlet />
  </div>
  
</main>

      </div>

    </div>
  );
};

export default DashboardLayout;