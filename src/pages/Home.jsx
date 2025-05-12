import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';
import Dashboard from './Dashboard';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  // Render Dashboard if authenticated
  if (isAuthenticated) {
    return <Dashboard />;
  }
  
  // Icons
  const CheckCircle = getIcon('CheckCircle');
  const Clock = getIcon('Clock');
  const CalendarDays = getIcon('CalendarDays');
  const Users = getIcon('Users');

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient">TaskFlow</span>
            <span className="text-surface-800 dark:text-white"> keeps you organized</span>
          </h1>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto mb-8">
            The simple, efficient way to organize tasks and boost your productivity. Get started in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn btn-primary px-8 py-3 text-lg">
              Sign Up Free
            </Link>
            <Link to="/login" className="btn btn-outline px-8 py-3 text-lg">
              Log In
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <motion.div variants={itemVariants} className="card p-6">
            <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-14 h-14 flex items-center justify-center mb-4">
              <CheckCircle size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">Easy Task Management</h3>
            <p className="text-surface-600 dark:text-surface-300">Quickly add, update, and track your tasks with our intuitive interface.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-14 h-14 flex items-center justify-center mb-4">
              <Clock size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">Priority Scheduling</h3>
            <p className="text-surface-600 dark:text-surface-300">Set priorities and due dates to stay focused on what matters most.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-14 h-14 flex items-center justify-center mb-4">
              <CalendarDays size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">Due Date Tracking</h3>
            <p className="text-surface-600 dark:text-surface-300">Never miss a deadline with clear due date visualization and reminders.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="card p-6">
            <div className="rounded-full bg-primary/10 dark:bg-primary/5 w-14 h-14 flex items-center justify-center mb-4">
              <Users size={28} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-surface-800 dark:text-white">Secure & Private</h3>
            <p className="text-surface-600 dark:text-surface-300">Your tasks and data are secure with our authentication system.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;