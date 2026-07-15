import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import sidebarLogo from '../assets/sidebar-logo.png';
import sidebarBg from '../assets/sidebar-bg.png';
import dashboardIcon from '../assets/dashboard.png';
import healthIcon from '../assets/health_profile.png';
import reportsIcon from '../assets/reports.png';
import resultsIcon from '../assets/results.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const Sidebar = ({
  isOpen,
  onClose,
  isCollapsed,
  toggleCollapse,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
const { logout } = useAuth();

const handleLogout = () => {
  logout();
  navigate('/login');
};
  
  
  const menuItems = [
    { 
      name: 'Dashboard',
      path: '/dashboard',
      icon: dashboardIcon
    },
    { 
      name: 'Health Profile',
      path: '/health-profile',
      icon: healthIcon
    },
    { 
      name: 'Medical Reports',
      path: '/medical-reports',
      icon: reportsIcon
    },
    { 
      name: 'Results',
      path: '/results',
      icon: resultsIcon
    },
];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
  style={{
    backgroundImage: `url(${sidebarBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
  className={`
    fixed top-0 left-0 min-h-screen shadow-2xl z-50
    ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
    transform transition-all duration-300 ease-in-out
    flex flex-col
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 lg:static lg:z-0
  `}
>
        <div
  className={`p-4 border-b border-gray-100 flex items-center ${
    isCollapsed ? 'justify-center' : 'justify-between'
  }`}
>
  {!isCollapsed && (
  <img
    src={sidebarLogo}
    alt="NutriNav"
    className="h-14 w-auto"
  />
)}

  <button
  onClick={toggleCollapse}
  className="p-2 rounded-lg text-white hover:bg-white hover:text-black transition-all duration-200"
>
  {isCollapsed ? (
    <ChevronRight size={18} />
  ) : (
    <ChevronLeft size={18} />
  )}
</button>
</div>
        
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
  key={item.path}
  to={item.path}
  onClick={onClose}
  className={`
    flex items-center px-4 py-3 rounded-xl
    ${isCollapsed ? 'justify-center' : 'gap-3'}
    transition-all duration-200
    ${
  isActive(item.path)
    ? 'bg-gradient-to-r from-[#FF7A00] to-[#FF4A1F] text-white shadow-lg'
    : 'text-white hover:bg-transparent hover:border hover:border-white/50 hover:text-white'
}
  `}
>

<img
  src={item.icon}
  alt={item.name}
  className="w-6 h-6 object-contain"
/>


{!isCollapsed && (
  <span className="font-medium">
    {item.name}
  </span>
)}

</Link>
          ))}
          <button
  onClick={handleLogout}
  className={`
    w-full flex items-center px-4 py-3 rounded-xl
    ${isCollapsed ? 'justify-center' : 'gap-3'}
    text-red-300
    hover:bg-red-500/20
    transition-all duration-200
  `}
>
  {!isCollapsed && (
    <span className="font-medium">
      Logout
    </span>
  )}

  {isCollapsed && (
    <span>↩</span>
  )}
</button>
                </nav>

        
      </aside>
    </>
  );
};

export default Sidebar;
