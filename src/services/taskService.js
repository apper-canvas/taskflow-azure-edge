// Task Service for Apper Backend Integration

/**
 * Fetches all tasks from the database
 * @returns {Promise<Array>} Array of task objects
 */
export const fetchTasks = async () => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY || 'test-public-key'
    });
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "title" } },
        { Field: { Name: "description" } },
        { Field: { Name: "status" } },
        { Field: { Name: "priority" } },
        { Field: { Name: "dueDate" } },
        { Field: { Name: "Owner" } },
        { Field: { Name: "Tags" } }
      ],
      orderBy: [
        { field: "dueDate", direction: "asc" }
      ],
      pagingInfo: {
        limit: 100,
        offset: 0
      }
    };
    
    const response = await apperClient.fetchRecords("task23", params);
    
    if (!response || !response.data || response.data.length === 0) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

/**
 * Creates a new task in the database
 * @param {Object} taskData - Task data to be created
 * @returns {Promise<Object>} Created task object
 */
export const createTask = async (taskData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY || 'test-public-key'
    });
    
    // Map the task data to the database fields
    const params = {
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status || 'pending',
      priority: taskData.priority || 'medium',
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      Owner: taskData.Owner || null
    };
    
    const response = await apperClient.createRecord("task23", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to create task");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task");
  }
};

/**
 * Updates an existing task in the database
 * @param {Object} taskData - Task data to be updated
 * @returns {Promise<Object>} Updated task object
 */
export const updateTaskRecord = async (taskData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY || 'test-public-key'
    });
    
    // Make sure Id is included in the params
    if (!taskData.Id) {
      throw new Error("Task ID is required for updating");
    }
    
    // Map the task data to the database fields
    const params = {
      Id: taskData.Id,
      title: taskData.title,
      description: taskData.description || '',
      status: taskData.status,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      Owner: taskData.Owner || null
    };
    
    const response = await apperClient.updateRecord("task23", params);
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to update task");
    }
    
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw new Error("Failed to update task");
  }
};

/**
 * Deletes a task from the database
 * @param {number} taskId - ID of the task to delete
 * @returns {Promise<boolean>} Success status
 */
export const deleteTaskRecord = async (taskId) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID || 'test-project-id',
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY || 'test-public-key'
    });
    
    const response = await apperClient.deleteRecord("task23", { Id: taskId });
    
    if (!response || !response.success) {
      throw new Error(response?.message || "Failed to delete task");
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw new Error("Failed to delete task");
  }
};