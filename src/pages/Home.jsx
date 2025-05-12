import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const CheckCircle = getIcon('CheckCircle');
  const Shield = getIcon('Shield');
  const Calendar = getIcon('Calendar');
  const ArrowRight = getIcon('ArrowRight');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
        >
          Manage Your Tasks with <span className="text-gradient">TaskFlow</span>
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto"
        >
          A simple, efficient way to organize your work and boost productivity.
        </motion.p>
        
        {!isAuthenticated && (
          <motion.div 
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <Link 
              to="/login" 
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-outline px-8 py-3 text-lg"
            >
              Create Account
            </Link>
          </motion.div>
        )}

        {isAuthenticated && (
          <motion.div 
            variants={itemVariants}
            className="mt-10"
          >
            <Link 
              to="/dashboard" 
              className="btn btn-primary px-8 py-3 text-lg inline-flex items-center"
            >
              Go to Dashboard
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible" 
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        <motion.div variants={itemVariants} className="card p-6 border-t-4 border-t-primary">
          <div className="bg-primary/10 dark:bg-primary/5 p-3 rounded-full w-fit mb-4">
            <CheckCircle className="text-primary" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Stay Organized</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Keep track of your tasks with a clean, intuitive interface. Never miss a deadline again.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6 border-t-4 border-t-secondary">
          <div className="bg-secondary/10 dark:bg-secondary/5 p-3 rounded-full w-fit mb-4">
            <Shield className="text-secondary" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Secure Access</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Your data is protected with secure authentication. Access your tasks from anywhere, anytime.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="card p-6 border-t-4 border-t-accent">
          <div className="bg-accent/10 dark:bg-accent/5 p-3 rounded-full w-fit mb-4">
            <Calendar className="text-accent" size={28} />
          </div>
          <h3 className="text-xl font-bold mb-2">Manage Deadlines</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Set priorities and due dates for your tasks. Stay on top of your schedule with visual indicators.
          </p>
        </motion.div>
      </motion.div>

      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-surface-600 dark:text-surface-300 mb-8 max-w-2xl mx-auto">
            Sign in to access your tasks or create a new account to start organizing your work and boosting your productivity today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/login" 
              className="btn btn-primary px-6 py-2"
            >
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="btn btn-outline px-6 py-2"
            >
              Create Account
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Home;