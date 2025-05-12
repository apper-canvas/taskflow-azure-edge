import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  filter: 'all',
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(task => task.Id === action.payload.Id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.Id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  setLoading, 
  setError,
  setFilter
} = taskSlice.actions;

export default taskSlice.reducer;