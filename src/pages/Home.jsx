import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const CheckCircle = getIcon('CheckCircle');
  const ListChecks = getIcon('ListChecks');
  const Rocket = getIcon('Rocket');

  useEffect(() => {
    // Simulate a brief loading state for better UX
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast.success("Welcome to TaskFlow!", {
        icon: "🚀",
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gradient">
            Organize Your Tasks with Ease
          </h1>
          <p className="text-lg md:text-xl text-surface-600 dark:text-surface-300 max-w-3xl mx-auto">
            A simple and powerful task management application to boost your productivity.
          </p>
        </motion.div>

        <MainFeature />

        <motion.div 
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <div className="card hover:shadow-soft transition-all duration-300">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="rounded-full bg-primary-light/20 dark:bg-primary-dark/20 p-3 mb-4">
                <CheckCircle size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Simple Task Management</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Create, edit, and complete tasks with a clean and intuitive interface.
              </p>
            </div>
          </div>

          <div className="card hover:shadow-soft transition-all duration-300">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="rounded-full bg-secondary-light/20 dark:bg-secondary-dark/20 p-3 mb-4">
                <ListChecks size={24} className="text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Priority Management</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Set task priorities to make sure you focus on what matters most.
              </p>
            </div>
          </div>

          <div className="card hover:shadow-soft transition-all duration-300">
            <div className="flex flex-col items-center p-4 text-center">
              <div className="rounded-full bg-accent/20 p-3 mb-4">
                <Rocket size={24} className="text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Boost Productivity</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Stay on top of your tasks and achieve more in less time.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Productivity workspace with planner and coffee" 
            className="w-full max-w-4xl mx-auto rounded-2xl shadow-lg"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;