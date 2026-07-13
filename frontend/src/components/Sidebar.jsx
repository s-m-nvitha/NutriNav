import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
  logout();
  onClose?.();
  navigate('/login');
};
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Health Profile', path: '/health-profile', icon: '👤' },
    { name: 'Medical Reports', path: '/medical-reports', icon: '📋' },
    { name: 'Results', path: '/results', icon: '📈' },
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
      
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-0
      `}>
        <div className="p-6 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-2xl font-bold gradient-text">NutriNav</h2>
          <p className="text-sm text-gray-500 mt-1">AI Nutrition Guide</p>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive(item.path)
                  ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'
                }
              `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
                </nav>

        <div className="p-4 border-t border-gray-100 flex-shrink-0">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4">

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {user?.full_name?.charAt(0) || 'U'}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {user?.full_name || 'User'}
                </p>

                <p className="text-xs text-gray-500">
                  {user?.email || 'No email'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-lg transition"
            >
              Logout
            </button>

          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
