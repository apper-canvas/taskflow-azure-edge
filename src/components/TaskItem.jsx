import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';
import { format } from 'date-fns';

const TaskItem = ({ task, toggleStatus, handleEdit, handleDelete }) => {
  const Trash2 = getIcon('Trash2');
  const Edit = getIcon('Edit');
  const CheckCircle = getIcon('CheckCircle');
  const Circle = getIcon('Circle');
  const Clock = getIcon('Clock');
  const AlertCircle = getIcon('AlertCircle');
  const CalendarDays = getIcon('CalendarDays');

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

  const priorityInfo = getPriorityInfo(task.priority);
  const PriorityIcon = priorityInfo.icon;

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'MM/dd/yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 shadow-sm p-4 transform transition-all duration-200 ${
        task.status === 'completed' 
          ? 'opacity-75 dark:opacity-50' 
          : 'hover:shadow-soft'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => toggleStatus(task.Id)}
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
                  <span>{formatDate(task.dueDate)}</span>
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
            onClick={() => handleDelete(task.Id)}
            className="p-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-surface-500 hover:text-red-600 dark:text-surface-400 dark:hover:text-red-400 transition-colors duration-200"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;