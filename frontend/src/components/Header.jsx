import React from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ onMenuClick, isMenuOpen }) => {
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
            <h1 className="text-2xl font-bold gradient-text">NutriNav</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm text-gray-600">
              AI Powered Personalized Nutrition Guide
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
