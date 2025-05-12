import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { AuthContext } from '../App';
import getIcon from '../utils/iconUtils';

const Navigation = ({ isDarkMode, toggleDarkMode }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();
  
  const LogOut = getIcon('LogOut');
  const User = getIcon('User');
  const LayoutDashboard = getIcon('LayoutDashboard');

  return (
    <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 py-3 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="font-bold text-xl md:text-2xl text-gradient">TaskFlow</Link>
        </motion.div>
        
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light flex items-center gap-2">
                <LayoutDashboard size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              <div className="text-surface-700 dark:text-surface-300 flex items-center gap-2">
                <User size={18} />
                <span className="hidden sm:inline truncate max-w-[150px]">
                  {user?.firstName || 'User'}
                </span>
              </div>
              
              <button 
                onClick={logout}
                className="text-surface-700 dark:text-surface-300 hover:text-red-500 dark:hover:text-red-400 flex items-center gap-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-surface-700 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
                Login
              </Link>
              <Link to="/signup" className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg transition-colors">
                Sign Up
              </Link>
            </>
          )}
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={toggleDarkMode}
            className="rounded-full p-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-surface-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;