import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const AlertTriangle = getIcon('AlertTriangle');
  const ArrowLeft = getIcon('ArrowLeft');

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center bg-white dark:bg-surface-800 shadow-lg rounded-lg p-8"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle size={36} className="text-red-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-surface-800 dark:text-surface-100 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-200 mb-4">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white py-2 px-6 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;