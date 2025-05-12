import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  setFilter,
  setLoading,
  setError
} from '../store/taskSlice';
import { AuthContext } from '../App';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { fetchTasks, createTask, updateTaskRecord, deleteTaskRecord } from '../services/taskService';
import getIcon from '../utils/iconUtils';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, error, filter } = useSelector(state => state.tasks);
  const user = useSelector(state => state.user.user);
  const { isAuthenticated } = useContext(AuthContext);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      toast.info("Please log in to view your dashboard");
    }
  }, [isAuthenticated, navigate]);
  
  // Icon declarations
  const Plus = getIcon('Plus');
  const X = getIcon('X');
  
  // State management
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    Id: null,
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0],
    Owner: user?.userId || null
  });
  
  // Fetch tasks on component mount if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const loadTasks = async () => {
        try {
          dispatch(setLoading(true));
          const tasksData = await fetchTasks();
          dispatch(setTasks(tasksData));
        } catch (error) {
          console.error("Error fetching tasks:", error);
          dispatch(setError("Failed to load tasks. Please try again."));
          toast.error("Failed to load tasks. Please try again.");
        }
      };
      
      loadTasks();
    }
  }, [dispatch, isAuthenticated]);
  
  // If not authenticated, don't render the component
  if (!isAuthenticated) {
    return null;
  }
  
  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'high') return task.priority === 'high';
    return true;
  });
  
  // Add or update a task
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentTask.title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    
    try {
      if (isEditing) {
        // Update existing task
        const updatedTask = await updateTaskRecord(currentTask);
        dispatch(updateTask(updatedTask));
        toast.success("Task updated successfully!");
      } else {
        // Add new task
        const newTask = {
          ...currentTask,
          Owner: user?.userId || null
        };
        const createdTask = await createTask(newTask);
        dispatch(addTask(createdTask));
        toast.success("New task added!");
      }
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error("Failed to save task. Please try again.");
    }
  };
  
  // Delete a task
  const handleDelete = async (id) => {
    try {
      await deleteTaskRecord(id);
      dispatch(deleteTask(id));
      toast.info("Task removed");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };
  
  // Edit a task
  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowForm(true);
  };
  
  // Toggle task completion status
  const toggleStatus = async (id) => {
    try {
      const taskToUpdate = tasks.find(task => task.Id === id);
      if (!taskToUpdate) return;
      
      const newStatus = taskToUpdate.status === 'completed' ? 'pending' : 'completed';
      const updatedTask = { ...taskToUpdate, status: newStatus };
      
      const result = await updateTaskRecord(updatedTask);
      dispatch(updateTask(result));
      
      if (newStatus === 'completed') {
        toast.success("Task completed! 🎉");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Failed to update task status. Please try again.");
    }
  };
  
  // Reset the form
  const resetForm = () => {
    setCurrentTask({
      Id: null,
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
      Owner: user?.userId || null
    });
    setIsEditing(false);
    setShowForm(false);
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 shadow-lg">
          <div className="p-4 md:p-6 bg-primary/10 dark:bg-primary/5 border-b border-surface-200 dark:border-surface-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary dark:text-primary-light">
                My Tasks
              </h2>
              
              <div className="flex gap-3">
                <div className="flex items-center">
                  <label htmlFor="filter" className="sr-only">Filter tasks</label>
                  <select
                    id="filter"
                    value={filter}
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    className="rounded-lg border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-700 shadow-sm text-sm py-2 px-3"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary-dark text-white px-4 py-2 transition-colors duration-200"
                >
                  {showForm ? <X size={20} /> : <Plus size={20} />}
                  <span className="ml-2 font-medium">{showForm ? 'Cancel' : 'Add Task'}</span>
                </motion.button>
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {showForm && (
              <TaskForm
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                handleSubmit={handleSubmit}
                isEditing={isEditing}
                resetForm={resetForm}
              />
            )}
          </AnimatePresence>
          
          <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500 dark:text-red-400">{error}</p>
                <button 
                  onClick={() => location.reload()}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-surface-400 dark:text-surface-500"
                >
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM8.5 12C8.5 10.0705 10.0705 8.5 12 8.5C13.9295 8.5 15.5 10.0705 15.5 12C15.5 13.9295 13.9295 15.5 12 15.5C10.0705 15.5 8.5 13.9295 8.5 12Z" fill="currentColor"/>
                    <path d="M8 9H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <h3 className="text-xl font-medium mb-2">No tasks found</h3>
                  <p className="text-surface-500 dark:text-surface-400">
                    {filter === 'all' 
                      ? "Your task list is empty. Add a new task to get started!" 
                      : `No tasks match the "${filter}" filter. Try a different filter or add more tasks.`}
                  </p>
                </motion.div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskItem
                      key={task.Id}
                      task={task}
                      toggleStatus={toggleStatus}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              </AnimatePresence>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;