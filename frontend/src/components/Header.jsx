import logo from '../assets/nn_logo.png';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick, isMenuOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
  setShowDropdown(false);
  logout();
  navigate('/login');
};
  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <img
  src={logo}
  alt="NutriNav"
  className="h-12 w-auto cursor-pointer"
  onClick={() => navigate('/dashboard')}
/>
          </div>
          
          <div className="flex items-center gap-4">
  <div className="hidden md:block">
  <p className="font-semibold text-gray-800">
    Welcome back, {user?.full_name?.split(' ')[0]} 👋
  </p>
  <p className="text-sm text-gray-500">
    Let's improve your nutrition today
  </p>
</div>

  <div className="relative">
    <button
      onClick={() => setShowDropdown(!showDropdown)}
      className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold flex items-center justify-center"
    >
      {user?.full_name?.charAt(0).toUpperCase()|| 'U'}
    </button>

    {showDropdown && (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="font-semibold">
  {user?.full_name || 'User'}
</p>
          <p className="text-xs text-gray-500">
  {user?.email}
</p>
        </div>

        <button
  onClick={() => {
  setShowDropdown(false);
  navigate('/health-profile');
}}
  className="w-full text-left px-4 py-2 hover:bg-gray-50"
>
  Health Profile
</button>

        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-50"
        >
          Settings
        </button>

        <button
  onClick={handleLogout}
  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
>
  Logout
</button>
      </div>
    )}
  </div>
</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
