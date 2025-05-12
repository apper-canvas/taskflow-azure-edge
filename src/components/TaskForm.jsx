import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import getIcon from '../utils/iconUtils';
import { format } from 'date-fns';

const TaskForm = ({ 
  currentTask, 
  setCurrentTask, 
  handleSubmit, 
  isEditing, 
  resetForm 
}) => {
  const X = getIcon('X');
  const user = useSelector(state => state.user.user);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask({ ...currentTask, [name]: value });
  };

  // Format date for input
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'yyyy-MM-dd');
    } catch (error) {
      return '';
    }
  };

  return (
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
              className="w-full rounded-lg border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 shadow-sm p-2"
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
              className="w-full rounded-lg border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 shadow-sm p-2"
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
                className="w-full rounded-lg border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 shadow-sm p-2"
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
                value={formatDate(currentTask.dueDate)}
                onChange={handleInputChange}
                className="w-full rounded-lg border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 shadow-sm p-2"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-lg border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors"
            >
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default TaskForm;