import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = () => {
  // Icon declarations
  const Plus = getIcon('Plus');
  const X = getIcon('X');
  const Trash2 = getIcon('Trash2');
  const Edit = getIcon('Edit');
  const CheckCircle = getIcon('CheckCircle');
  const Circle = getIcon('Circle');
  const Clock = getIcon('Clock');
  const AlertCircle = getIcon('AlertCircle');
  const CalendarDays = getIcon('CalendarDays');
  
  // State management
  const [tasks, setTasks] = useState(() => {
    // Load tasks from localStorage if available
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
      { 
        id: 1, 
        title: "Create your first task",
        description: "Click the + button to add your own tasks",
        status: "pending",
        priority: "medium",
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0] // Tomorrow
      }
    ];
  });
  
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    id: null,
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });
  const [filter, setFilter] = useState('all');
  
  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'high') return task.priority === 'high';
    return true;
  });
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };
  
  // Add or update a task
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!currentTask.title.trim()) {
      toast.error("Task title cannot be empty!");
      return;
    }
    
    if (isEditing) {
      // Update existing task
      const updatedTasks = tasks.map(task => 
        task.id === currentTask.id ? currentTask : task
      );
      setTasks(updatedTasks);
      toast.success("Task updated successfully!");
    } else {
      // Add new task
      const newTask = {
        ...currentTask,
        id: Date.now(),
        status: 'pending'
      };
      setTasks([newTask, ...tasks]);
      toast.success("New task added!");
    }
    
    // Reset form
    resetForm();
  };
  
  // Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.info("Task removed");
  };
  
  // Edit a task
  const handleEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setShowForm(true);
  };
  
  // Toggle task completion status
  const toggleStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        
        if (newStatus === 'completed') {
          toast.success("Task completed! 🎉");
        }
        
        return { ...task, status: newStatus };
      }
      return task;
    });
    
    setTasks(updatedTasks);
  };
  
  // Reset the form
  const resetForm = () => {
    setCurrentTask({
      id: null,
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
    setShowForm(false);
  };
  
  // Get the appropriate priority color and icon
  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'high':
        return { color: 'text-red-500 bg-red-100 dark:bg-red-900/30', icon: AlertCircle };
      case 'medium':
        return { color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30', icon: Clock };
      case 'low':
        return { color: 'text-green-500 bg-green-100 dark:bg-green-900/30', icon: CheckCircle };
      default:
        return { color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30', icon: Circle };
    }
  };
  
  return (
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
                onChange={(e) => setFilter(e.target.value)}
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
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 md:p-6 bg-white dark:bg-surface-900 border-b border-surface-200 dark:border-surface-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={currentTask.title}
                    onChange={handleInputChange}
                    placeholder="What needs to be done?"
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={currentTask.description}
                    onChange={handleInputChange}
                    placeholder="Add details (optional)"
                    rows="3"
                    className="input"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      value={currentTask.priority}
                      onChange={handleInputChange}
                      className="input"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      id="dueDate"
                      name="dueDate"
                      value={currentTask.dueDate}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    {isEditing ? 'Update Task' : 'Add Task'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="p-4 md:p-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
        {filteredTasks.length === 0 ? (
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
              {filteredTasks.map((task) => {
                const priorityInfo = getPriorityInfo(task.priority);
                const PriorityIcon = priorityInfo.icon;
                
                return (
                  <motion.div
                    key={task.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className={`card transform transition-all duration-200 ${
                      task.status === 'completed' 
                        ? 'opacity-75 dark:opacity-50' 
                        : 'hover:shadow-soft'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStatus(task.id)}
                        className={`mt-1 flex-shrink-0 ${task.status === 'completed' ? 'text-green-500' : 'text-surface-400 hover:text-primary'}`}
                        aria-label={task.status === 'completed' ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {task.status === 'completed' ? (
                          <CheckCircle size={22} className="fill-green-500 text-white" />
                        ) : (
                          <Circle size={22} />
                        )}
                      </button>
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <h3 className={`text-lg font-medium mr-2 ${
                            task.status === 'completed' 
                              ? 'line-through text-surface-500 dark:text-surface-500' 
                              : 'text-surface-800 dark:text-surface-100'
                          }`}>
                            {task.title}
                          </h3>
                          
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${priorityInfo.color}`}>
                              <PriorityIcon size={14} />
                              <span className="capitalize">{task.priority}</span>
                            </span>
                            
                            {task.dueDate && (
                              <span className="inline-flex items-center gap-1 text-xs text-surface-500 dark:text-surface-400">
                                <CalendarDays size={14} />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className={`text-sm ${
                            task.status === 'completed' 
                              ? 'text-surface-500 dark:text-surface-500' 
                              : 'text-surface-600 dark:text-surface-400'
                          }`}>
                            {task.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-1.5 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200 transition-colors duration-200"
                          aria-label="Edit task"
                        >
                          <Edit size={18} />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-surface-500 hover:text-red-600 dark:text-surface-400 dark:hover:text-red-400 transition-colors duration-200"
                          aria-label="Delete task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default MainFeature;