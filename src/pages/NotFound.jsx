import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const NotFound = () => {
  const Home = getIcon('Home');
  const AlertTriangle = getIcon('AlertTriangle');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
          <AlertTriangle size={40} className="text-orange-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">Page Not Found</h1>
        
        <p className="text-lg text-surface-600 dark:text-surface-300 mb-8">
          Oops! It seems like the page you're looking for doesn't exist or has been moved.
        </p>
        
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors duration-300"
          >
            <Home size={20} />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;